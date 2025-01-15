import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {

  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext); 

  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center gap-4 py-4 mt-20 justify-between border-y-2 '>
        <img width={50} src={assets.company_icon} alt="" />
        <p className={`flex-1 border-1 ${isDarkMode ? 'text-white' : 'border-gray-400  text-gray-500'} pl-4 text-sm max-sm:hidden`}>Copyright @Listya | All Right Reserved.</p>
        <div className={`flex gap-2.5 border-gray-400  text-gray-500 pl-4 text-sm max-sm:hidden`}>
            <img className={`${isDarkMode ? 'bg-white rounded-full' : 'border-gray-400  text-gray-500'}`} width={38} src={assets.facebook_icon} alt="" />
            <img className={`${isDarkMode ? 'bg-white rounded-full' : 'border-gray-400  text-gray-500'}`} width={38} src={assets.twitter_icon} alt="" />
            <img className={`${isDarkMode ? 'bg-white rounded-full' : 'border-gray-400  text-gray-500'}`} width={38} src={assets.instagram_icon} alt="" />
        </div>
    </div>
  )
}

export default Footer