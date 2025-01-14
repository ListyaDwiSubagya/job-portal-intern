import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      navigate('/'); // Redirect to home if already authenticated
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const savedName = localStorage.getItem('name');
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    if (!savedName || !savedEmail || !savedPassword) {
      // Save new credentials if not already saved
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('isAuthenticated', 'true');
      toast.success("Login successful")
      navigate('/');
    } else if (email === savedEmail && password === savedPassword) {
        // Validate credentials
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
    } else {
        toast.error("Invalid credentials")
    }
  };

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-gray-100 flex justify-center items-center'>
      <form onSubmit={handleLogin} className='relative bg-white p-10 rounded-xl text-slate-500 border border-gray-300'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter Login</h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>

        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
          <img src={assets.person_icon} alt="Email Icon" />
          <input
            className='outline-none text-sm'
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            placeholder='Your Name'
            required
          />
        </div>
        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
          <img src={assets.email_icon} alt="Email Icon" />
          <input
            className='outline-none text-sm'
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder='Email Id'
            required
          />
        </div>
        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
          <img src={assets.lock_icon} alt="Lock Icon" />
          <input
            className='outline-none text-sm'
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder='Password'
            required
          />
        </div>

        <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
