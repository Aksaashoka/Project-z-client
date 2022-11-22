import React, { createContext, useCallback, useState } from 'react';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';

export const AuthContext = createContext();

const initialState = {
    id: null,
    checking: false,
    logged: false,
    name: null,
    email: null,
};


export const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState(initialState)

    const login = async( email, password ) => {

        const user = await fetchSinToken('auth/login', { email, password }, 'POST');

        if ( user) {
            localStorage.setItem('token', user.accessToken );


            setAuth({
                id: user.id,
                checking: false,
                logged: true,
                name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            });

        }

        return user;

    }

    //TODO:RENOVAR TOKEN
    const verificaToken = useCallback( async() => {

        const token = localStorage.getItem('token');
        // Si token no existe
        if ( !token ) {
            setAuth({
                id: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            })

            return false;
        }

        const resp = await fetchConToken('login/renew');
        if ( resp.ok ) {
            localStorage.setItem('token', resp.token );
            const { usuario } = resp;

            setAuth({
                id: usuario.id,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email,
            });

            return true;
        } else {
            setAuth({
                id: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            });

            return false;
        }

    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            checking: false,
            logged: false,
        });
    }

    return (
        <AuthContext.Provider value={{
            auth,
            login,
            verificaToken,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

