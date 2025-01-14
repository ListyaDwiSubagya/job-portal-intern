import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { ThemeContext } from '../context/ThemeContext'; // Pastikan path benar

const Profile = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext); // Mengakses tema
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [originalName, setOriginalName] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [originalPassword, setOriginalPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedPassword) setOriginalPassword(storedPassword);

    setOriginalName(storedName);
    setOriginalEmail(storedEmail);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    if (password) {
      localStorage.setItem('password', password);
    }
    toast.success('Profile updated successfully!');
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  const isFormUnchanged = name === originalName && email === originalEmail && password === originalPassword;

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-full max-w-md p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold text-start'>Edit Profile</h2>
          <img className='w-12 h-12 rounded-full' src={assets.profile_img} alt="Profile" />
        </div>
        <form onSubmit={handleSave}>
          <div className='mb-4'>
            <label className='block text-gray-700 font-bold mb-2'>Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
              placeholder='Enter your name'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 font-bold mb-2'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 font-bold mb-2'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
              placeholder='Enter new password'
            />
            <p className='text-sm text-gray-500 mt-1'>Leave blank to keep your current password.</p>
          </div>
          <div className='flex justify-between'>
            <button
              type='button'
              onClick={handleBack}
              className='bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600'
            >
              Back
            </button>
            <button
              type='submit'
              disabled={isFormUnchanged}
              className={`${
                isFormUnchanged ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } text-white px-6 py-2 rounded-lg`}
            >
              Save
            </button>
          </div>
        </form>
        <div className='mt-4'>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className='bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-600'
          >
            Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
