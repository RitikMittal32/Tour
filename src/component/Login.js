import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './url';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async () => {
    let result = await fetch(`${BASE_URL}/login`, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result = await result.json();
    if (result.name) {
      localStorage.setItem('user', JSON.stringify(result));
      navigate('/');
    } else {
      alert('Please enter correct details');
    }
  };

  return (
    <div className='login'>
      <h1>Login</h1>
      <input
        type='text'
        className='inputBox'
        placeholder='Enter Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className='password-container'>
        <input
          type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
          className='inputBox'
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          className='show-password-button'
        >
          {showPassword ? 'HIDE' : 'SHOW'}
        </button>
      </div>
      <button type='button' onClick={handleLogin} className='registerButton'>
        Login
      </button>
    </div>
  );
};

export default Login;
