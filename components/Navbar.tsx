"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, Menu, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [username, setUsername] = useState("");

  console.log(username);

  const router = useRouter();
  const logOut = async () => {
    const response = await fetch("/api/auth/logout");
    console.log(response);
    router.push("/login");
  };

  const getUser = async () => {
    const response = await fetch("/api/user");
    const result = await response.json();

    console.log(result);

    if (result.success) {
      setUsername(result.user.username);
    } else {
      setUsername(result.message);
    }
  };

  useEffect(() => {
    getUser();
  }, [username]);

  return (
    <>
      <div className="border-b shadow-sm fixed flex justify-between items-center top-0 w-full max-w-[768px] min-w-[375px] m-auto bg-white py-2 px-4">
        <Link href={"/"} className="text-lg font-black">
          히로바
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none hover:bg-slate-200 rounded-full transition">
            <Menu size={40} className="p-2" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuLabel>
              {username} {username === "로그인해주세요" ? null : "님"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {username === "로그인해주세요" ? (
              <>
                <Link href={"/login"}>
                  <DropdownMenuItem>
                    <div className="flex gap-2 p-1">
                      <LogIn size={20} />
                      <span>로그인</span>
                    </div>
                  </DropdownMenuItem>
                </Link>
                <Link href={"/signup"}>
                  <DropdownMenuItem>
                    <div className="flex gap-2 p-1">
                      <UserRoundPlus size={20} />
                      <span>회원가입</span>
                    </div>
                  </DropdownMenuItem>
                </Link>
              </>
            ) : (
              <DropdownMenuItem>
                <div
                  onClick={() => {
                    logOut();
                  }}
                  className="flex gap-2 p-1"
                >
                  <LogOut size={20} />
                  <span>로그아웃</span>
                </div>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default Navbar;
