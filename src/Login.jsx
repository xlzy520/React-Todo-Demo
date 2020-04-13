import React, { useState } from 'react';
import {fetchLogin, fetchLoginStatus} from './services';
import messages from './messages';
import spinner from './icons/spinner.svg';

const Login = ({ onLogin }) => {

    // This state is all local to the component
    const [username, setUsername] = useState('funky');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const performLogin = () => {
        if(!username) {
            setError(messages.USERNAME_REQUIRED);
            return;
        }
        // set output for while we wait
        setError('');
        setIsLoading(true);
        // start service call
        fetchLogin(username)
            .then( (userInfo) => {
              onLogin(userInfo.data.username); // inform parent
            })
            .catch( (err) => {
                setError(messages[err.code || 'DEFAULT']);
                setIsLoading(false);
            });
    };

    return (
        <div className="login">
          <h3 className="login-title">Login</h3>
          <div className="login-box">
            <label className="login-label">Username:  </label>
            <input className="funky-input" onChange={ (e) => setUsername(e.target.value) }/>
            <p className="error">{error}</p>
          </div>
         <div className="submit">
           { isLoading ?
             <img alt="spinner" src={spinner}/> :
             <button className="funky-btn funky-btn-primary" onClick={ performLogin }>Login</button>
           }
         </div>
        </div>
    );

};

export default Login;
