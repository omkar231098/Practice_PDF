import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3001/api/register', {
        username,
        password,
      });

      console.log('User registered successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Signup;
