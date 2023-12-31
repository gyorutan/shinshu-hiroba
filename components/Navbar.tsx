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
import {
  LogIn,
  LogOut,
  Menu,
  UserRound,
  UserRoundCog,
  UserRoundPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const getUser = async () => {
    const response = await axios.get("/api/user");
    const result = await response.data;

    const user = result.user;

    console.log(user);

    setUsername(user.username);
  };

  const logOut = async () => {
    await axios.get("/api/auth/logout");
    toast.success("로그아웃하였습니다");
    router.push("/");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="border-b shadow-sm fixed flex justify-between items-center top-0 w-full max-w-[768px] min-w-[375px] m-auto bg-blue-500 text-white py-2 px-5">
        <Link href={"/post"} className="text-lg font-black">
          대학교 광장
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none hover:bg-blue-400 rounded-full transition">
            <Menu size={40} className="p-2" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuLabel className="flex gap-2 justify-center items-center">
              <UserRound />
              {username ? `${username}` : "로그인해주세요"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {username ? (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/profile");
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex gap-2 p-1">
                    <UserRoundCog size={20} />
                    <span>내정보</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    logOut();
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex gap-2 p-1">
                    <LogOut size={20} />
                    <span>로그아웃</span>
                  </div>
                </DropdownMenuItem>
              </>
            ) : (
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
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default Navbar;
