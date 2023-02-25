'use client';
import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import loadingStyles from './loading.module.css';


function Loading() {
  return (
    <div id='skeleton-wrap' className='flex w-screen h-screen z-50 flex-wrap'>
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
    </div>
  )
}

export default Loading