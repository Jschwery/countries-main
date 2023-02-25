import "../styles/globals.css";
import Header from "../components/header";
import Providers from "../components/providers";

export default function RootLayout({children}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html className="dark">
      <Providers>
        <body className=" dark:bg-slate-800">
          <Header/>
        {children}
        </body>
      </Providers>
    </html>
  )
}

