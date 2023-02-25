// components/common/MainLayout.tsx
import React, { PropsWithChildren } from "react";
const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};
export default MainLayout;