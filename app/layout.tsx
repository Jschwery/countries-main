import "../styles/globals.css";
import Header from "../components/header";
import { store } from "../global/store";
import { Provider } from "react-redux";
import ThemeProviders from "../components/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html className="dark">
      <Provider store={store}>
        <ThemeProviders>
          <body className=" dark:bg-slate-800">
            <Header />
            {children}
          </body>
        </ThemeProviders>
      </Provider>
    </html>
  );
}
