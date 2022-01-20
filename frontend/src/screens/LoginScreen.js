import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button/Button';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
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
            New user? <Link to='/'>Register</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
