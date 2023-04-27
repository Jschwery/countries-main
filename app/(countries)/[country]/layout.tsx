// components/common/MainLayout.tsx
import React, { PropsWithChildren } from 'react';
import ThemeProviders from '@components/providers';
import Providers from '@components/providers';
const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Providers>
        <ThemeProviders>
          <main>{children}</main>
        </ThemeProviders>
      </Providers>
    </>
  );
};
export default MainLayout;
