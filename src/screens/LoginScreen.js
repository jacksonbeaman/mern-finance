import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';
import Input from '../components/input/Input';

const LoginScreen = ({ onSignIn }) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      let email = emailInput.trim();
      let password = passwordInput.trim();
      setLoginError('');
      await onSignIn({ username: email, password });
      setEmailInput('');
      setPasswordInput('');
      navigate('/');
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <>
      <div className={`container + formScreen`}>
        <div className='formContainer'>
          <h1>Sign In</h1>
          <form onSubmit={submitHandler}>
            <Input
              label='Email Address'
              type='email'
              name='email'
              placeholder='Enter email'
              handleInputChange={(e) => setEmailInput(e.target.value)}
              inputValue={emailInput}
            />
            <Input
              label='Password'
              type='password'
              name='password'
              placeholder='Enter password'
              handleInputChange={(e) => setPasswordInput(e.target.value)}
              inputValue={passwordInput}
              inputError={loginError}
            />
            <Button type='submit' text='Sign In' />
          </form>
          <span>
            New user? <Link to='/register'>Register</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
