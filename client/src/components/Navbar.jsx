import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext); 

  useEffect(() => {
    // Ambil nama dari localStorage
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('name'); // Hapus nama dari localStorage
    navigate('/login');
  };

  return (
    <div className={`shadow py-4 ${isDarkMode ? 'bg-gray-900 shadow-white' : 'bg-white'}`}>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
        <img onClick={() => navigate('/')} className='cursor-pointer' width={50} src={assets.company_icon} alt="Logo" />

        
        {/* <div className='flex items-center gap-3'>
          <Link to={'/applications'}>Applied Jobs</Link>
          <p> | </p>
          {userName ? (
            <div className='flex items-center'>
              <p>Hi, {userName}</p>
            </div>
          ) : (
            <p>Hi, Guest</p>
          )}
        </div> */}
        
        <div className='flex gap-4 max-sm:text-sm'>
          <h1 className={`px-6 text-lg sm:px-2 py-3.5 rounded-full hidden md:block ${isDarkMode ? 'text-white' : ''}`}>Hi, {userName}</h1>
          <div className='relative group'>
              <img className='w-12 py-1' src={assets.profile_img} alt="" />
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 '>
                  <div className={`list-none m-0 p-2 ${isDarkMode ? 'bg-black shadow-black-lg border-black' : 'bg-white shadow-lg border'}  rounded-md  text-sm `}>
                     <button onClick={() => navigate('/profile')} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full mb-2'>Profile</button>
                      {userName ? (
                        <button onClick={handleLogout} className='bg-red-600 text-white px-6 sm:px-9 py-2 rounded-full'>Logout</button>
                      ) : (
                        <button onClick={() => navigate('/login')} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
                      )}
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
