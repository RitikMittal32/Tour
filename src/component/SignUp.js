import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './url';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const collectData = async () => {
    console.warn(name, email, password);
    let data = await fetch(`${BASE_URL}/register`, {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    data = await data.json();
    console.warn(data);
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/');
  };

  return (
    <div className='signup'>
      <h1>Register</h1>
      <input
        className='inputBox'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Enter Name'
      />
      <input
        className='inputBox'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter Email'
      />
      <div className='password-container'>
        <input
          type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
          className='inputBox'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter Password'
        />
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          className='show-password-button'
        >
          {showPassword ? 'HIDE' : 'SHOW'}
        </button>
      </div>
      <button type='button' onClick={collectData} className='registerButton'>
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
