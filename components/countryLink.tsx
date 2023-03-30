'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';

type Props = {
  children: ReactNode;
  href: string;
};

export default function CountryLink({ children, href }: Props) {
  let segment = useSelectedLayoutSegment();
  let active = href === '/${segment}';

  return (
    <Link className={active ? 'underline' : ''} href={href}>
      {children}
    </Link>
  );
}
