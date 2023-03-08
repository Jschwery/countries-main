// components/common/MainLayout.tsx
import React, { PropsWithChildren } from "react";
import ThemeProviders from "@components/providers";
import Maps from "./maps";
import Providers from "@components/providers";
import { countryData } from "@public/countryData";
const MainLayout = ({ children }: PropsWithChildren) => {


  return (
    <>
    <Providers>
      <ThemeProviders>
        <Maps />
        <main>{children}</main>
      </ThemeProviders>
      </Providers>
    </>
  );
};
export default MainLayout;