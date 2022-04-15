import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    let username = email;
    onSignUp({ username, password });
    alert(`${email}, ${password}, ${confirmPassword}`);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    username = '';
    navigate('/login');
  };

  return (
    <>
      <div className={`container + formScreen`}>
        <div className='formContainer'>
          <h1>Sign Up</h1>
          <form onSubmit={submitHandler}>
            <label>Email Address</label>
            <input
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label>Password</label>
            <input
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label>Confirm Password</label>
            <input
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
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
