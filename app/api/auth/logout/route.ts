import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({
      success: true,
      message: "로그아웃에 성공하였습니다",
    });
    response.cookies.delete("USER_TOKEN");
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "로그아웃에 실패하였습니다",
    });
  }
};
