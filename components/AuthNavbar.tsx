"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { LogIn, UserRoundPlus, X } from "lucide-react";

const AuthNavbar = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="fixed flex justify-between items-center top-0 w-full max-w-[768px] min-w-[375px] m-auto bg-white p-5">
        {pathname === "/signup" ? (
          <Button variant={"default"} asChild>
            <Link href={"/login"} className="flex gap-2">
              <LogIn size={20} />
              <span>로그인</span>
            </Link>
          </Button>
        ) : null}
        {pathname === "/login" ? (
          <Button variant={"default"} asChild>
            <Link href={"/signup"} className="flex gap-2">
              <UserRoundPlus size={20} />
              <span>회원가입</span>
            </Link>
          </Button>
        ) : null}
        <Link
          href={"/"}
          className="hover:bg-red-400 bg-red-300 rounded-full p-2"
        >
          <X />
        </Link>
      </div>
    </>
  );
};

export default AuthNavbar;
