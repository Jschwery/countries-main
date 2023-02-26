'use client';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack';
import React from 'react'
import loadingStyles from './loading.module.css';


function Loading() {
  return ( 
    <div className='flex w-screen h-screen z-50 flex-wrap justify-center align-middle'>
       <CircularProgress className='mt-10' />
    </div>
  )
}

export default Loading