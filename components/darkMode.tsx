'use client';
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import {SunIcon, MoonIcon} from "@heroicons/react/24/solid";

function DarkMode() {
    const [mounted, setMounted] = useState(false);
    const {systemTheme, theme, setTheme} = useTheme();

    useEffect( ()=>{
        setMounted(true);
    },[])
    if(!mounted){
        return null;
    }

    const currentTheme = theme === "system" ? systemTheme: theme;
  return (
    <div>
        {currentTheme === 'dark' ? (
            <SunIcon className='h-8 w-8 cursor-pointer text-yellow-300' onClick={()=> setTheme('light')}/>
        ):(
            <MoonIcon className='h-8 w-8 cursor-pointer text-slate-400' onClick={()=> setTheme('dark')}/>
                
        )}
    </div>
  )
}

export default DarkMode