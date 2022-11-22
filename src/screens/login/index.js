import './login.css'
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import Swal from 'sweetalert2';

const Login = () => {

    const { login } = useContext( AuthContext );
    
    const [ form, setForm ] = useState({
        email: '',
        password: '',
    });

    const onChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const onSubmit = async(ev) => {
        ev.preventDefault();
        
        const { email, password } = form;
        const ok = await login( email, password );

        if ( !ok ) {
            Swal.fire('Error', 'Verifique el usuario y contraseña', 'error');
        }
    }

    const validateInputs = () => {
        return ( form.email.length > 0 && form.password.length > 0 );
    }


    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-50 p-b-90">
                    <form 
                        className="login100-form validate-form flex-sb flex-w"
                        onSubmit={ onSubmit }
                    >
                        <span className="login100-form-title mb-3">
                            Z Planning
                        </span>
                        <div className="wrap-input100 validate-input mb-3">
                            <input
                                className="input100"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={ form.email }
                                onChange={ onChange }
                            />
                            <span className="focus-input100"></span>
                        </div>           
                        <div className="wrap-input100 validate-input mb-3">
                            <input
                                className="input100"
                                type="password"
                                name="password"
                                placeholder="Password" 
                                value={ form.password }
                                onChange={ onChange }
                            />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="container-login100-form-btn m-t-17">
                            <button 
                                type="submit"
                                className="login100-form-btn"
                                disabled={ !validateInputs() }
                            >
                                Ingresar
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login

