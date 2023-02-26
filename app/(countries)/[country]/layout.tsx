// components/common/MainLayout.tsx
import React, { PropsWithChildren } from "react";
import Providers from "../../../components/providers";
const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Providers>
        <main>{children}</main>
      </Providers>
    </>
  );
};
export default MainLayout;