import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SocietyConnectLogo from '../components/logo.jpeg'; // Import your Society Connect logo image

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/admin-signup', {
        email,
        password,
      });

      if (response.data === 'exist') {
        setError('User already exists');
      } else if (response.data === 'notexist') {
        navigate('/home', { state: { id: email } });
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Wrong details');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/signup-background.jpg")', backgroundSize: 'cover', color: '#fff' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={SocietyConnectLogo} alt="Society Connect Logo" style={{ height: '80px' }} />
        <h1 style={{ margin: '0', fontWeight: 'bold', fontSize: '24px' }}>Society Connect Administration</h1>
      </div>
      
      {/* Signup Container */}
      <div style={{ backgroundColor: 'rgba(255,255,255,0.8)', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', width: '400px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 20px', fontWeight: 'bold' }}>Signup</h2>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', width: '100%', border: 'none', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px', width: '100%', border: 'none', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
          />
          <input type="submit" value="Submit" style={{ padding: '12px 20px', borderRadius: '5px', border: 'none', background: '#2980b9', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', transition: 'background-color 0.3s' }} />
        </form>
        {error && <p style={{ color: 'red', margin: '10px 0' }}>{error}</p>}
        <p style={{ margin: '20px 0', fontSize: '14px' }}>Already have an account? <Link to="/" style={{ color: '#2980b9', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
