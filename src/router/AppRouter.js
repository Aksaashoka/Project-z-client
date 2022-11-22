import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import {HomeScreen} from '../screens/home';
import { AuthRouter } from './AuthRouter';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const { auth, verificaToken } = useContext( AuthContext );

    // useEffect( () => {
    //     verificaToken();
    // },[verificaToken])


    // if ( auth.checking ) {
    //     return <h1>Espere por favor</h1>
    // }

    // const auth = {
    //     logged: true
    // }

    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route path="/auth" component={ AuthRouter } /> */}
                    <PublicRoute isAuthenticated={ auth.logged } path="/auth" component={ AuthRouter } />
                    <PrivateRoute isAuthenticated={ auth.logged } path="/" component={ HomeScreen } />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
