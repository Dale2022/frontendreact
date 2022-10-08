import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { baseUrl, userKeyy } from "../../../global"
import AuthContext from '../../../store/auth-context';
import classes from './AuthForm.module.css';
import axios from 'axios'
const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
      `${baseUrl}/login`;
    } else {
      url =
      `${baseUrl}/login`;
    }
      //

        const method = 'post'
        axios[method](url, {email: enteredEmail, password: enteredPassword})
            .then(data => {
                setIsLoading(false);
                const expirationTime = new Date(
                    data.data.exp *1000
                  );
                  console.log(data.data)
                  console.log(expirationTime)
                 authCtx.login(data.data.token,data.data,expirationTime.toISOString())
                 //  authCtx.login(data.data.token,expirationTime)
                 history.replace('/');
            })
            .catch(

                function (error) {
                    
                    try {
                        if(error.response.data) {
                            console.log(error.response.data)
                        } else if (error) {
                            console.log(error)
                        }
                    } catch (error) {
                      console.log(error)
                    }

                  }
            )
    
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
