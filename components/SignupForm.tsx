"use client";

import {Button} from "./ui/button";
import {ChangeEvent, useState} from "react";
import toast from "react-hot-toast";
import {ArrowLeft, ArrowRight, Check, Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useDebounce} from "@/hooks/useDebounce";
import axios from "axios";

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
}

const SignupForm = () => {
    const router = useRouter();
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
    });
    const [isChecking, setIsChecking] = useState({
        username: "normal",
        studentId: "normal",
        password: "normal",
    });

    const resetFormData = () => {
        setFormData({
            ...formData,
            sei: "",
            mei: "",
            username: "",
            studentId: "",
            password: "",
        });
    };

    // 회원가입 데이터 중복검사
    const checkingValue = async (name: string, value: string) => {
        // username 정규식
        const usernameRegex = new RegExp("^[a-zA-Z0-9ぁ-んァ-ン一-龯]{3,10}$");
        // 학적번호 정규식
        const studentIdRegex = new RegExp("^[0-9]{2}[a-z]{1}[0-9]{4}[a-z]{1}$");
        // password 정규식
        const passwordRegex = new RegExp("^[a-zA-Z0-9]{6,20}$");

        // username의 값이 null일때
        if (name === "username" && !value) {
            setIsChecking({...isChecking, username: "normal"});
            return;
        }
        // null이 아니면 username의 정규식 검증
        else if (name === "username" && value) {
            const result = usernameRegex.test(value);
            console.log(result);
            // username의 정규식 검증이 통과하면 중복검사 실행
            if (result) {
                const response = await axios.get(`/api/auth/${name}/${value}`);
                const result = await response.data;
                console.log(result);
                // 중복검사의 결과
                setIsChecking({...isChecking, username: result.result});
            }
            // 정규식 검증에 실패했을때
            else {
                setIsChecking({...isChecking, username: "regex"});
                return;
            }
        }

        // studentId 값이 null일때
        if (name === "studentId" && !value) {
            setIsChecking({...isChecking, studentId: "normal"});
            return;
        }
        // null이 아니면 studentId 정규식 검증
        else if (name === "studentId" && value) {
            const result = studentIdRegex.test(value);
            console.log(result);
            // studentId 정규식 검증이 통과하면 중복검사 실행
            if (result) {
                const response = await axios.get(`/api/auth/${name}/${value}`);
                const result = await response.data;
                console.log(result);
                // 중복검사의 결과
                setIsChecking({...isChecking, studentId: result.result});
            }
            // 정규식 검증에 실패했을때
            else {
                setIsChecking({...isChecking, studentId: "regex"});
                return;
            }
        }

        // password의 값이 null일때
        if (name === "password" && !value) {
            setIsChecking({...isChecking, password: "normal"});
            return;
        }
        // null이 아니면 password의 정규식 검증
        else if (name === "password" && value) {
            const result = passwordRegex.test(value);
            // password의 정규식 검증이 통과하면 중복검사 실행
            if (result) {
                setIsChecking({...isChecking, password: "available-password"});
            }
            // 정규식 검증에 실패했을때
            else {
                setIsChecking({...isChecking, password: "regex"});
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
        setFormData({...formData, [name]: value});
        onChangeDebounced(name, value);
    };

    const gotoNumberTwoScreenCondition = () => {
        if (formData.sei === "") {
            toast.error("성을 입력해주세요 !");
            return;
        } else if (formData.mei === "") {
            toast.error("이름을 입력해주세요 !");
            return;
        }
        handleNextScreen();
    };

    const gotoNumberThreeScreenCondition = () => {
        if (formData.username === "") {
            toast.error("닉네임을 입력해주세요 !");
            return;
        } else if (formData.studentId === "") {
            toast.error("학번을 입력해주세요 !");
            return;
        } else if (
            isChecking.username !== "available-username" ||
            isChecking.studentId !== "available-studentId"
        ) {
            toast.error("입력한 정보가 올바르지 않습니다");
            return;
        }
        handleNextScreen();
    };

    const handleNextScreen = () => {
        setPageData({...pageData, screenNumber: pageData.screenNumber + 1});
    };

    const handleBeforeScreen = () => {
        setPageData({...pageData, screenNumber: pageData.screenNumber - 1});
    };

    const handleSignup = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            isChecking.username !== "available-username" ||
            isChecking.studentId !== "available-studentId" ||
            isChecking.password !== "available-password"
        ) {
            toast.error("입력한 정보가 올바르지 않습니다");
            return;
        }
        try {
            setPageData({...pageData, isLoading: true});

            const response = await axios.post('api/auth/signup', formData);
            const result = await response.data;
            console.log("result", result);

            if (result.success) {
                toast.success(`${result.message}`);
                router.push("/login");
            } else {
                toast.error(`${result.message}`);
                resetFormData();
                setPageData({...pageData, screenNumber: 1});
            }
        } catch (error) {
            console.log(error);
        } finally {
            setPageData({...pageData, isLoading: false});
        }
    };

    return (
        <>
            <form
                className="p-20 flex flex-col gap-10 w-full"
                onSubmit={handleSignup}
            >
                <p className="text-3xl font-black text-center">회원가입</p>
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
                                            handleChange(e);
                                        }}
                                        id="sei"
                                        name="sei"
                                        required
                                        type="text"
                                        className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 focus:border-blue-400 outline-none rounded-md shadow-md transition"
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
                                            handleChange(e);
                                        }}
                                        id="mei"
                                        name="mei"
                                        required
                                        type="text"
                                        className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 focus:border-blue-400 outline-none rounded-md shadow-md transition"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    onClick={() => {
                                        gotoNumberTwoScreenCondition();
                                    }}
                                    className="w-full bg-blue-500 hover:bg-blue-500 hover:bg-opacity-90"
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
                                    {isChecking.username === "unavailable-username" ? (
                                        <span className="absolute right-3 top-2 font-medium text-sm text-red-500">
                      이미 사용중인 닉네임입니다
                    </span>
                                    ) : null}
                                    {isChecking.username === "available-username" ? (
                                        <span className="absolute right-3 top-2 text-sm text-green-500">
                      사용 가능한 닉네임입니다
                    </span>
                                    ) : null}
                                    {isChecking.username === "regex" ? (
                                        <span className="absolute right-3 top-2 text-sm text-red-500">
                      영문・일어・숫자/3 ~ 10자
                    </span>
                                    ) : null}
                                    <input
                                        value={formData.username}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        id="username"
                                        name="username"
                                        required
                                        type="text"
                                        className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 focus:border-blue-400 outline-none rounded-md shadow-md transition"
                                    />
                                </div>
                                <div className="relative">
                                    <label
                                        htmlFor="studentId"
                                        className="absolute left-3 top-2 font-bold text-sm"
                                    >
                                        학번
                                    </label>
                                    {isChecking.studentId === "unavailable-studentId" ? (
                                        <span className="absolute right-3 top-2 text-sm text-red-500">
                      이미 존재하는 학번입니다
                    </span>
                                    ) : null}
                                    {isChecking.studentId === "available-studentId" ? (
                                        <span className="absolute right-3 top-2 text-sm text-green-500">
                      사용 가능한 학번입니다
                    </span>
                                    ) : null}
                                    {isChecking.studentId === "regex" ? (
                                        <span className="absolute right-3 top-2 text-sm text-red-500">
                      학번이 올바르지 않습니다
                    </span>
                                    ) : null}
                                    <input
                                        value={formData.studentId}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        id="studentId"
                                        name="studentId"
                                        required
                                        type="text"
                                        className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 focus:border-blue-400 outline-none rounded-md shadow-md transition"
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
                                    <ArrowLeft size={20}/>
                                    <span>수정</span>
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        gotoNumberThreeScreenCondition();
                                    }}
                                    className="w-full flex gap-2 bg-blue-500 hover:bg-blue-500 hover:bg-opacity-90"
                                >
                                    <span>다음</span>
                                    <ArrowRight size={20}/>
                                </Button>
                            </div>
                        </div>
                    </>
                ) : null}

                {/* ScreenNumber 3 password, passwordCheck, submit */}
                {pageData.screenNumber === 3 ? (
                    <>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-3">
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
                                        value={formData.password}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        id="password"
                                        name="password"
                                        required
                                        type="password"
                                        className="tracking-[4px] bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 focus:border-blue-400 outline-none rounded-md shadow-md transition"
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
                                    className="w-full"
                                >
                                    <div className="flex gap-2">
                                        <ArrowLeft size={20}/>
                                        <span>수정</span>
                                    </div>
                                </Button>
                                {pageData.isLoading ? (
                                    <Button
                                        disabled
                                        className="w-full flex gap-2 bg-blue-600 hover:bg-blue-600 hover:bg-opacity-90"
                                    >
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        <span>계정 생성중...</span>
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="w-full flex gap-2 bg-blue-600 hover:bg-blue-600 hover:bg-opacity-90"
                                    >
                                        <Check size={20}/>
                                        <span>가입</span>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                ) : null}
            </form>
        </>
    );
};

export default SignupForm;
