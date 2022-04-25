import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';

const LoginScreen = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    onSignIn({ username: email, password });
    alert(`${email}, ${password}`);
    setEmail('');
    setPassword('');
    navigate('/');
  };

  return (
    <>
      <div className={`container + formScreen`}>
        <div className='formContainer'>
          <h1>Sign In</h1>
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