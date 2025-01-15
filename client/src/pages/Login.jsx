import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThemeContext } from '../context/ThemeContext'; 

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/'); 
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Set default email and password for validation
    const savedEmail = 'Aksamedia@example.com';  
    const savedPassword = 'password123';

    // Cek apakah data sudah ada di localStorage
    const savedName = localStorage.getItem('name');
    const savedEmailInStorage = localStorage.getItem('email');
    const savedPasswordInStorage = localStorage.getItem('password');

    // Jika data belum ada di localStorage, simpan data baru
    if (!savedName || !savedEmailInStorage || !savedPasswordInStorage) {
      if (name && email === savedEmail && password === savedPassword) {
        localStorage.setItem('name', name);
        localStorage.setItem('email', savedEmail);
        localStorage.setItem('password', savedPassword);
        localStorage.setItem('isAuthenticated', 'true');
        toast.success("Login successful");
        navigate('/');
      } else {
        toast.error("Invalid credentials");
      }
    } else if (savedEmailInStorage === savedEmail && savedPasswordInStorage === savedPassword) {
      
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className={`absolute top-0 left-0 right-0 bottom-0 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} flex justify-center items-center`}>
      <form onSubmit={handleLogin} className={`relative ${isDarkMode ? 'bg-gray-900 border-gray-100' : 'bg-white border-gray-300'} p-10 rounded-xl text-slate-500 border `}>
        <h1 className={`text-center text-2xl ${isDarkMode ? 'text-white' : 'text-neutral-700'} font-medium`}>Recruiter Login</h1>
        <p className={`text-sm ${isDarkMode ? 'text-white' : ''}`}>Welcome back! Please sign in to continue</p>

        <div className={`border px-4 py-2 flex items-center gap-2 rounded-full mt-5 ${isDarkMode ? 'bg-white' : ''}`}>
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
        <div className={`border px-4 py-2 flex items-center gap-2 rounded-full mt-5  ${isDarkMode ? 'bg-white' : ''}`}>
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
        <div className={`border px-4 py-2 flex items-center gap-2 rounded-full mt-5  ${isDarkMode ? 'bg-white' : ''}`}>
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
