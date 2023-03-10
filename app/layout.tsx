import "../styles/globals.css";
import Header from "@components/header";
import { Provider } from "react-redux";
import ThemeProviders from "@components/providers";
import Providers from "@components/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html className="dark">
      <Providers>
        <ThemeProviders>
          <body className=" dark:bg-slate-800">
            <Header />
            {children}
          </body>
        </ThemeProviders>
      </Providers>
    </html>
  );
}
