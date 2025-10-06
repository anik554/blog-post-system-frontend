import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow-1 container mx-auto px-4">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
