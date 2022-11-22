import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from '../screens/login';


export const AuthRouter = () => {
    return (
        <Switch>
            <Route exact path="/auth/login" component={ Login } />

            <Redirect to="/auth/login" />
        </Switch>
    )
}
