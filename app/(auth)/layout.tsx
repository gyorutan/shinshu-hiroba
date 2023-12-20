"use client";

import AuthNavbar from "@/components/AuthNavbar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      <div className="layout max-w-[768px] min-w-[375px] min-h-screen m-auto">
        <AuthNavbar />
        <main className="">{children}</main>
      </div>
    </>
  );
};

export default AuthLayout;
