"use client";

import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface FormDataProps {
  studentId: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataProps>({
    studentId: "",
    password: "",
  });

  const resetFormData = () => {
    setFormData({
      ...formData,
      studentId: "",
      password: "",
    });
  };

  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("result", result);

      if (result.success) {
        toast.success(result.message, {
          duration: 3000,
          position: "top-right",
        });
        router.push("/");
      } else {
        toast.error(result.message, {
          duration: 3000,
          position: "top-right",
        });
        resetFormData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="p-20 flex flex-col gap-10 w-full" onSubmit={handleLogin}>
        <p className="text-2xl font-black text-center">로그인</p>
        <>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <label
                  htmlFor="studentId"
                  className="absolute left-3 top-2 font-bold text-sm"
                >
                  학번
                </label>
                <input
                  value={formData.studentId}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      studentId: e.target.value,
                    });
                  }}
                  id="studentId"
                  name="studentId"
                  required
                  type="text"
                  className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md transition"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="absolute left-3 top-2 font-bold text-sm"
                >
                  비밀번호
                </label>
                <input
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    });
                  }}
                  id="password"
                  name="password"
                  required
                  type="password"
                  className="tracking-[4px] bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md transition"
                />
              </div>
            </div>
            {isLoading ? (
              <Button disabled className="w-full flex gap-2">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>로그인중...</span>
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                확인
              </Button>
            )}
          </div>
        </>

        {/* ScreenNumber 2 username, studentId */}

        {/* <div className="flex gap-3">
            <div className="relative">
              <label
                htmlFor="sei"
                className="absolute left-3 top-2 font-medium text-sm"
              >
                姓（カナ）
              </label>
              <input
                // value={reservationData.writer}
                // onChange={(e) => {
                //   setReservationData({
                //     ...reservationData,
                //     writer: e.target.value,
                //   });
                // }}
                id="sei"
                name="sei"
                required
                type="text"
                className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md transition"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="mei"
                className="absolute left-3 top-2 font-medium text-sm"
              >
                名（カナ）
              </label>
              <input
                // value={reservationData.writer}
                // onChange={(e) => {
                //   setReservationData({
                //     ...reservationData,
                //     writer: e.target.value,
                //   });
                // }}
                id="mei"
                name="mei"
                required
                type="text"
                className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md transition"
              />
            </div>
          </div> */}
        {/* ログイン情報 */}
        {/* <div className="flex flex-col gap-3">
            <div className="relative">
              <label
                htmlFor="username"
                className="absolute left-3 top-2 font-medium text-sm"
              >
                ハンドルネーム
              </label>
              <input
                // value={reservationData.writer}
                // onChange={(e) => {
                //   setReservationData({
                //     ...reservationData,
                //     writer: e.target.value,
                //   });
                // }}
                id="username"
                name="username"
                required
                type="text"
                className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md transition"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="studentId"
                className="absolute left-3 top-2 font-medium text-sm"
              >
                学籍番号
              </label>
              <input
                // value={reservationData.writer}
                // onChange={(e) => {
                //   setReservationData({
                //     ...reservationData,
                //     writer: e.target.value,
                //   });
                // }}
                id="studentId"
                name="studentId"
                required
                type="text"
                className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md transition"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="absolute left-3 top-2 font-medium text-sm"
              >
                パスワード
              </label>
              <input
                // value={reservationData.writer}
                // onChange={(e) => {
                //   setReservationData({
                //     ...reservationData,
                //     writer: e.target.value,
                //   });
                // }}
                id="password"
                name="password"
                required
                type="password"
                className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md tracking-[4px] transition"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password-check"
                className="absolute left-3 top-2 font-medium text-sm"
              >
                パスワード確認
              </label>
              <input
                // value={reservationData.writer}
                // onChange={(e) => {
                //   setReservationData({
                //     ...reservationData,
                //     writer: e.target.value,
                //   });
                // }}
                id="password-check"
                name="passwordCheck"
                required
                type="password"
                className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md tracking-[4px] transition"
              />
            </div>
          </div> */}
        {/* <Button type="submit">登録</Button> */}
      </form>
    </>
  );
};

export default LoginForm;
