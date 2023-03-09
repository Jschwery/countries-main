import React from 'react'
import Link from 'next/link'
import DarkMode from './darkMode';
import RecentCountries from './recentCountries';


//recent countries should have margin to center the countries within it should start at the beginning and
//then go to the right, we will have a max width, an an overflow x-auto to scroll
//the countries will be links that can be clicked on

//on the page, have a compare countries option that will have a section from the history
//and also from a the list of all countries
//the page can have a component that will be displayed based off of the state of shown or unshown
//if shown then the country page will be diplayed and shift the current country to the right.

//option to save comparisons
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
