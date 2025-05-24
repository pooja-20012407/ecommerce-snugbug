import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import title from '../../assets/images/title.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form fields
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      // Save token to localStorage
      localStorage.setItem('token', res.data.token);

      setSuccess('Login successful!');
      navigate('/home');
    } catch (err: any) {
      if (err.response && err.response.data) {
        // Check if it's a custom error message from backend
        setError('Incorrect email or password');
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-yellow-400 px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        <img src={title} alt="title" className="h-10 object-contain" />
        <div className="text-2xl font-bold text-pink-600 ml">SnugBug</div>
      </nav>

      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Login to SnugBug</h2>
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2 text-center">{success}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full bg-orange-400 text-white font-bold py-2 rounded hover:bg-pink-500"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
