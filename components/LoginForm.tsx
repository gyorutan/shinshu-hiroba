"use client";

import { Button } from "./ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDebounce } from "@/hooks/useDebounce";
import { api } from "@/helper/api";
import axios from "axios";
// import { useLoginCheck } from "@/helper/useLoginCheck";

interface LoginData {
  studentId: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState<LoginData>({
    studentId: "",
    password: "",
  });
  const [isChecking, setIsChecking] = useState({
    studentId: "normal",
    password: "normal",
  });

  // useLoginCheck();

  // 로그인 데이터 초기화
  const resetData = () => {
    setLoginData({
      ...loginData,
      studentId: "",
      password: "",
    });
    setIsChecking({ ...isChecking, studentId: "normal", password: "normal" });
  };

  // 로그인 데이터 중복검사
  const checkingValue = async (name: string, value: string) => {
    // 학적번호 정규식
    const studentIdRegex = new RegExp("^[0-9]{2}[a-z]{1}[0-9]{4}[a-z]{1}$");
    // password 정규식
    const passwordRegex = new RegExp("^[a-zA-Z가-힣0-9]{6,20}$");

    // studentId 값이 null일때
    if (name === "studentId" && !value) {
      setIsChecking({ ...isChecking, studentId: "normal" });
      return;
    }
    // null이 아니면 studentId 정규식 검증
    else if (name === "studentId" && value) {
      const result = studentIdRegex.test(value);
      // studentId 정규식 검증 성공
      if (result) {
        setIsChecking({ ...isChecking, studentId: "available-studentId" });
      }
      // studentId 정규식 검증 실패
      else {
        setIsChecking({ ...isChecking, studentId: "regex" });
        return;
      }
    }

    // password 값이 null일때
    if (name === "password" && !value) {
      setIsChecking({ ...isChecking, password: "normal" });
      return;
    }
    // null 아니면 password의 정규식 검증
    else if (name === "password" && value) {
      const result = passwordRegex.test(value);
      // password 정규식 검증 성공
      if (result) {
        setIsChecking({ ...isChecking, password: "available-password" });
      }
      // password 정규식 검증 실패
      else {
        setIsChecking({ ...isChecking, password: "regex" });
        return;
      }
    }
  };

  // 디바운스
  const onChangeDebounced = useDebounce(checkingValue);

  // 인풋 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setLoginData({ ...loginData, [name]: value });
    onChangeDebounced(name, value);
  };

  // 로그인 함수
  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      isChecking.studentId !== "available-studentId" ||
      isChecking.password !== "available-password"
    ) {
      toast.error("입력한 정보가 올바르지 않습니다", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post('api/auth/login', loginData);
      const result = await response.data;
      if (result.success) {
        // localStorage.setItem("user_token", result.accessToken);
        router.push("/post");
        toast.success(result.message);
      } else {
        resetData();
        toast.error(result.message);
      }
    } catch (error: any) {
      resetData();
      console.log("로그인 실패", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="p-20 flex flex-col gap-10 w-full" onSubmit={handleLogin}>
        <p className="text-3xl font-black text-center drop-shadow-md">로그인</p>
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
                {isChecking.studentId === "regex" ? (
                  <span className="absolute right-3 top-2 text-sm text-red-500">
                    학번이 올바르지 않습니다
                  </span>
                ) : null}
                {isChecking.studentId === "available-studentId" ? (
                  <span className="absolute right-3 top-2 text-sm text-green-500">
                    올바른 학번입니다
                  </span>
                ) : null}
                <input
                  value={loginData.studentId}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  id="studentId"
                  name="studentId"
                  required
                  type="text"
                  className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border focus:border-blue-400 border-slate-300 outline-none rounded-md shadow-md transition"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="absolute left-3 top-2 font-bold text-sm"
                >
                  비밀번호
                </label>
                {isChecking.password === "available-password" ? (
                  <p className="absolute right-3 top-2 text-sm text-green-500">
                    올바른 비밀번호입니다
                  </p>
                ) : null}
                {isChecking.password === "regex" ? (
                  <span className="absolute right-3 top-2 text-sm text-red-500">
                    영문/숫자 6 ~ 20자
                  </span>
                ) : null}
                <input
                  value={loginData.password}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  id="password"
                  name="password"
                  required
                  type="password"
                  className="tracking-[4px] bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border focus:border-blue-400 border-slate-300 outline-none rounded-md shadow-md transition"
                />
              </div>
            </div>
            {isLoading ? (
              <Button disabled className="w-full flex gap-2">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>로그인중...</span>
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-500 hover:bg-opacity-90"
              >
                로그인
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
