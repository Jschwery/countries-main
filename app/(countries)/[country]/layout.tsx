// components/common/MainLayout.tsx
import React, { PropsWithChildren } from "react";
import Providers from "../../../components/providers";
import Maps from "./maps";
const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Providers>
        <Maps />
        <main>{children}</main>
      </Providers>
    </>
  );
};
export default MainLayout;