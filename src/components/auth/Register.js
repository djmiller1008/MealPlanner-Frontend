import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as APIUtil from '../util/ApiUtil';
import '../../styles/auth.css';
import { useUser } from '../userProvider/UserProvider';

export default function Register() {
    const history = useHistory();

    const user = useUser();
    const [errorMessage, setErrorMessage] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    }); 

    useEffect(() => {
        if (user.jwt) {
            history.replace("/");
        }
    }, [user.jwt, history]);

    const removeErrorMessage = () => {
        setShowErrorMessage(false);
    };

    const displayErrorMessage = message => {
        setErrorMessage(message.map((error, idx) => <span key={idx}>{error}</span>));
        setShowErrorMessage(true);
    };

    const handleInput = (e, dataType) => {
        setFormData({ ...formData, [dataType]: e.target.value});
    };

    const handleSubmit = e => {  
        e.preventDefault();
        APIUtil.register(formData).then(response => {
            if (response.message) {
                displayErrorMessage(response.message);
            } else {
                user.setJwt(response.data);
            }
        })
    };

    return (
        <div className='login-container'>
            <div className='login-title-logo-div'>
                <i className="fa fa-cutlery logo auth-logo" aria-hidden="true"></i>
                <a href='/home' className='app-title-link'>
                    <h1 className='login-title'>mealPlanner</h1>
                </a>
            </div>
            
            <div className='auth-container-big-screen'>
                <div className='auth-form-container'>
                    {showErrorMessage && (
                    <div id='auth-error-div' className='auth-error-div'>
                        {errorMessage}
                        <span className='close-error-message' onClick={removeErrorMessage}>&times;</span>
                    </div> )}
                    <h1 className='auth-form-title'>Sign up</h1>
                    <form onSubmit={handleSubmit}>
                        <section className='input-section'>
                            <label className='auth-input-label' htmlFor='username'>Username</label>
                            <input className='input' onChange={e => handleInput(e, 'username')} type='text'></input>
                        </section>
                        <section className='input-section'>
                            <label className='auth-input-label' htmlFor='password'>Password</label>
                            <input className='input' onChange={e => handleInput(e, 'password')} type='password'></input>
                        </section>
                        <section className='auth-button-section'>
                            <input className='nav-button button' type='submit' value='Sign up'></input>
                        </section>
                    </form>
                </div>
            </div>
        </div>
    );
};