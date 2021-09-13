import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLoggedIn } from '../../utils/utils';

const PrivateRoute = ({component:  Component, ...rest}: any) => {
    return (
        // <Route {...rest} render={props => (
        //     isLoggedIn() ?
        //         <Component {...props} />
        //     : <Redirect to="/" />
        // )} />
        <Route {...rest} render={props => (
            false ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;