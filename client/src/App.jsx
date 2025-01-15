import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { ThemeContext } from './context/ThemeContext';
import './index.css'; 
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check the user's preferred theme from localStorage or OS setting
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Store the theme preference in localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <div className={isDarkMode ? 'dark' : ''}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/apply-job/:id' element={<ApplyJob />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
