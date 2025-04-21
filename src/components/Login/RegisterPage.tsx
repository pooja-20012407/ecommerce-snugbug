import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import title from '../../assets/images/title.jpg';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Frontend validation
    if (!fullName || !phoneNumber || !email || !password || !userType) {
      setError('Please fill in all fields.');
      return;
    }

    // Phone number validation (exactly 10 digits)
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Phone number must be 10 digits.');
      return;
    }

    // Email validation (basic check for @ symbol)
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Password validation (at least 6 characters)
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', {
        fullName,
        phoneNumber,
        userType,
        email,
        password,
      });
      setSuccess(res.data);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Something went wrong');
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

      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Register to SnugBug</h2>
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2 text-center">{success}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select User Type</option>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>

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
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
