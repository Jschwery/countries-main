import React from 'react'
import Link from 'next/link'
import DarkMode from './darkMode';
import RecentCountries from './recentCountries';



const Header = () => {
  return (
    <div className='p-3 flex shadow-md md:align-middle justify-between dark:bg-slate-700 shadow-black'>
      <h2>Where in the World?</h2>
      <div className='flex items-center'>
      <RecentCountries/>
        <DarkMode/>
        <Link className=' hover:opacity-90 rounded-md p-1 text-xs self-center' href='/'>
          Home
        </Link>
      </div>
    </div>
  )
}

export default Header;
