'use client';
import React from 'react';
import { Skeleton } from '@mui/material';

interface SkeletonProps {
  // width: number;
  // height: number;
  shape?: 'circular' | 'rounded' | 'rectangular';
  className?: string;
}

export const SkeletonLoad: React.FC<SkeletonProps> = ({ shape, className }) => {
  return <Skeleton className={className} variant={shape} />;
};
