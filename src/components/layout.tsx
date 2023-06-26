import React, { ReactNode } from "react";

import "@/styles/globals.scss";
import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex min-h-screen justify-between">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
