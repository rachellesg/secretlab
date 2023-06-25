import React, { ReactNode } from "react";

import "@/styles/globals.scss";
import Header from "./common/header";
import Footer from "./common/footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex min-h-screen items-center justify-between">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;