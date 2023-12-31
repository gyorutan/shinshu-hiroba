"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      <div className="layout max-w-[768px] min-w-[375px] min-h-screen m-auto">
        {pathname === "/" ? null : <Navbar />}
        <main className="">{children}</main>
        {pathname === "/" ? null : <Footer />}
      </div>
    </>
  );
};

export default MainLayout;
