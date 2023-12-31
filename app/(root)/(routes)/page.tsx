import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-10 text-center">
        <h1 className="text-5xl font-bold text-white drop-shadow-md">
          🧙‍♂️ 대학교광장
        </h1>
        <p className="text-white text-lg">대학교 학생 커뮤니티</p>
        <div className="space-x-5">
          <Button asChild variant={"secondary"} size={"lg"}>
            <Link href={"/login"} className="font-semibold">
              로그인
            </Link>
          </Button>
          <Button asChild variant={"default"} size={"lg"}>
            <Link href={"/signup"} className="font-semibold">
              회원가입
            </Link>
          </Button>
        </div>
        {/* <Button variant={"link"} asChild className="text-white">
          <Link href={"/post"} className="font-semibold">
            나중에할게요
          </Link>
        </Button> */}
      </div>
    </div>
  );
}
