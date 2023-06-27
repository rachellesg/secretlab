import React, { ReactNode } from "react";

import "@/styles/globals.scss";
import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex justify-between flex-1 lg:p-7">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
