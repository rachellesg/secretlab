import React, { ReactNode } from "react";
import "@/styles/globals.css";
import "tailwindcss/tailwind.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid">
      <header>HEADER xx</header>
      <main>{children}</main>
      <footer>FOOTER xx</footer>
    </div>
  );
};

export default Layout;
