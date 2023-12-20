import { Button } from "@/components/ui/button";
import { LogIn, UserRoundPlus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col gap-10 justify-center items-center">
      <p className="text-3xl font-black">환영합니다</p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href={"/login"} className="flex gap-2">
            <LogIn size={20} />
            <span>로그인</span>
          </Link>
        </Button>
        <Button asChild>
          <Link href={"/signup"} className="flex gap-2">
            <UserRoundPlus size={20} />
            <span>회원가입</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
