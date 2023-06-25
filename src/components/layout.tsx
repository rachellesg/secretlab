import React, { ReactNode } from "react";
import "@/styles/globals.scss";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col p-4 sm:p-12 lg:p-24">
      <header>HEADER xx</header>
      <main className="flex min-h-screen items-center justify-between">
        {children}
      </main>
      <footer>FOOTER xx</footer>
    </div>
  );
};

export default Layout;
