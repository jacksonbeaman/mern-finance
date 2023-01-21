import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';
import { signUp } from '../utils/fetches';
import Input from '../components/input/Input';

const RegisterScreen = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState({
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    let username = emailInput;
    await signUp(username, passwordInput.password);
    setEmailInput('');
    setPasswordInput({ password: '', confirmPassword: '' });
    username = '';
    navigate('/login');
  };

  return (
    <>
      <div className={`container + formScreen`}>
        <div className='formContainer'>
          <h1>Sign Up</h1>
          <form onSubmit={submitHandler}>
            <Input
              label='Email Address'
              type='email'
              name='email'
              placeholder='Enter email'
              handleInputValidation={handleValidation}
              handleInputChange={(e) => setEmailInput(e.target.value)}
              inputValue={emailInput}
              inputError={emailError}
            />
            <Input
              label='Password'
              type='password'
              name='password'
              placeholder='Enter password'
              handleInputValidation={handleValidation}
              handleInputChange={(e) => handlePasswordChange(e)}
              inputValue={passwordInput.password}
              inputError={passwordError}
            />
            <Input
              label='Confirm Password'
              type='password'
              name='confirmPassword'
              placeholder='Confirm password'
              handleInputValidation={handleValidation}
              handleInputChange={(e) => handlePasswordChange(e)}
              inputValue={passwordInput.confirmPassword}
              inputError={confirmPasswordError}
            />
            <Button type='submit' text='Register' />
          </form>
          <span>
            Have an account? <Link to='/login'>Login</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
