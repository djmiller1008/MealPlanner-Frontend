import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { validateJwtToken } from './ApiUtil';
import { useUser } from '../userProvider/UserProvider';

export const PrivateRoute = props => {
    const user = useUser();

    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);
 
    if (user && user.jwt) {
        validateJwtToken(user.jwt).then(result => {
            setIsValid(result.data);
            setIsLoading(false);

            if (!result.data) {
                user.setJwt("");
            }
        });
    } else {
        return <Redirect to="/home" />;
    }

    if (isLoading) {
        return (
            <div className='loading-container'>
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            )
    } else {
        if (isValid) {
            return <Route {...props} />;
        } else {
            return <Redirect to="/home" />;
        }
    }
}

