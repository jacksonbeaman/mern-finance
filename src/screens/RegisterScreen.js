import { useEffect, useState } from 'react';
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
  const [inputFieldsValid, setUserInputFieldsValid] = useState(false);
  useEffect(() => {
    if (
      emailInput.length > 0 &&
      emailError.length === 0 &&
      passwordError.length === 0 &&
      passwordInput.confirmPassword === passwordInput.password &&
      passwordInput.confirmPassword.length > 0
    ) {
      setUserInputFieldsValid(true);
    } else {
      setUserInputFieldsValid(false);
    }
  }, [emailInput, emailError, passwordInput, passwordError]);

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const passwordInputValue = e.target.value.trim();
    setPasswordInput({ ...passwordInput, [e.target.name]: passwordInputValue });
  };

  const handleValidation = (e) => {
    const inputValue = e.target.value.trim();
    const inputFieldName = e.target.name;
    // check email format
    if (inputFieldName === 'email') {
      const emailFormatRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      const emailValid = emailFormatRegEx.test(inputValue);
      if (!emailValid) {
        setEmailError('Invalid email address');
      } else {
        setEmailError('');
      }
    }
    // check password format
    if (inputFieldName === 'password') {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;
      const passwordLength = inputValue.length;
      const uppercasePassword = uppercaseRegExp.test(inputValue);
      const lowercasePassword = lowercaseRegExp.test(inputValue);
      const digitsPassword = digitsRegExp.test(inputValue);
      const specialCharPassword = specialCharRegExp.test(inputValue);
      const minLengthPassword = minLengthRegExp.test(inputValue);
      let passwordErrorMessage = '';
      if (passwordLength === 0) {
        passwordErrorMessage = 'Password is empty';
      } else if (!uppercasePassword) {
        passwordErrorMessage = 'At least one Uppercase';
      } else if (!lowercasePassword) {
        passwordErrorMessage = 'At least one Lowercase';
      } else if (!digitsPassword) {
        passwordErrorMessage = 'At least one digit';
      } else if (!specialCharPassword) {
        passwordErrorMessage = 'At least one Special Characters';
      } else if (!minLengthPassword) {
        passwordErrorMessage = 'At least minumum 8 characters';
      } else {
        passwordErrorMessage = '';
      }
      setPasswordError(passwordErrorMessage);
    }
    // check confirm password
    if (
      inputFieldName === 'confirmPassword' ||
      (inputFieldName === 'password' &&
        passwordInput.confirmPassword.length > 0)
    ) {
      if (passwordInput.confirmPassword !== passwordInput.password) {
        setConfirmPasswordError('Confirm password is not matched');
      } else {
        setConfirmPasswordError('');
      }
    }
  };

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
            <Button
              type='submit'
              text='Register'
              disabled={!inputFieldsValid}
            />
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
