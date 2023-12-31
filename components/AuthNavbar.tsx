"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { LogIn, UserRoundPlus, X } from "lucide-react";

const AuthNavbar = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="fixed flex justify-between items-center top-0 w-full max-w-[768px] min-w-[375px] m-auto bg-inherit p-5">
        {pathname === "/signup" ? (
          <Button asChild className="bg-blue-500 hover:bg-blue-500 hover:bg-opacity-90">
            <Link href={"/login"} className="flex gap-2">
              <LogIn size={20} />
              <span>로그인</span>
            </Link>
          </Button>
        ) : null}
        {pathname === "/login" ? (
          <Button asChild className="bg-blue-500 hover:bg-blue-500 hover:bg-opacity-90">
            <Link href={"/signup"} className="flex gap-2">
              <UserRoundPlus size={20} />
              <span>회원가입</span>
            </Link>
          </Button>
        ) : null}
        <Link
          href={"/"}
          className="hover:bg-blue-400 bg-blue-500 text-white rounded-full p-2"
        >
          <X />
        </Link>
      </div>
    </>
  );
};

export default AuthNavbar;
