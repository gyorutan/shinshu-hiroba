"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PageDataProps {
  screenNumber: number;
  isLoading: boolean;
}

interface FormDataProps {
  sei: string;
  mei: string;
  username: string;
  studentId: string;
  password: string;
  passwordCheck: string;
}

const SignupForm = () => {
  const [pageData, setPageData] = useState<PageDataProps>({
    screenNumber: 1,
    isLoading: false,
  });

  const [formData, setFormData] = useState<FormDataProps>({
    sei: "",
    mei: "",
    username: "",
    studentId: "",
    password: "",
    passwordCheck: "",
  });

  const handleNextScreen = () => {
    setPageData({ ...pageData, screenNumber: pageData.screenNumber + 1 });
  };

  const handleBeforeScreen = () => {
    setPageData({ ...pageData, screenNumber: pageData.screenNumber - 1 });
  };

  return (
    <>
      <form className="p-20 flex flex-col gap-10 w-full">
        <p className="text-2xl font-black text-center">회원가입</p>
        {/* ScreenNumber 1 Sei, Mei */}
        {pageData.screenNumber === 1 ? (
          <>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <label
                    htmlFor="sei"
                    className="absolute left-3 top-2 font-bold text-sm"
                  >
                    성
                  </label>
                  <input
                    value={formData.sei}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        sei: e.target.value,
                      });
                    }}
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
                    className="absolute left-3 top-2 font-bold text-sm"
                  >
                    이름
                  </label>
                  <input
                    value={formData.mei}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        mei: e.target.value,
                      });
                    }}
                    id="mei"
                    name="mei"
                    required
                    type="text"
                    className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md transition"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    if (formData.sei === "") {
                      toast.error("성을 입력해주세요 !", {
                        duration: 3000,
                        position: "top-right",
                      });
                      return;
                    } else if (formData.mei === "") {
                      toast.error("이름을 입력해주세요 !", {
                        duration: 3000,
                        position: "top-right",
                      });
                      return;
                    }
                    handleNextScreen();
                  }}
                  className="w-full"
                >
                  다음
                </Button>
              </div>
            </div>
          </>
        ) : null}

        {/* ScreenNumber 2 username, studentId */}
        {pageData.screenNumber === 2 ? (
          <>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <label
                    htmlFor="username"
                    className="absolute left-3 top-2 font-bold text-sm"
                  >
                    닉네임
                  </label>
                  <input
                    value={formData.username}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        username: e.target.value,
                      });
                    }}
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
              </div>
              <div className="flex gap-2">
                <Button
                  variant={"destructive"}
                  type="button"
                  onClick={() => {
                    handleBeforeScreen();
                  }}
                  className="w-full flex gap-2"
                >
                  <ArrowLeft size={20} />
                  <span>수정</span>
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    if (formData.username === "") {
                      toast.error("ハンドルネームを入力してください！", {
                        duration: 3000,
                        position: "top-right",
                      });
                      return;
                    } else if (formData.studentId === "") {
                      toast.error("学籍番号を入力してください！", {
                        duration: 3000,
                        position: "top-right",
                      });
                      return;
                    }
                    handleNextScreen();
                  }}
                  className="w-full flex gap-2"
                >
                  <span>다음</span>
                  <ArrowRight size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : null}

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

export default SignupForm;
