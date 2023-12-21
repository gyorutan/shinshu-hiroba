import { getCurrentUser } from "@/hooks/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const user = getCurrentUser(request);
    if (user === "로그인해주세요") {
      return NextResponse.json({
        success: false,
        message: user,
      });
    }
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "서버 에러",
    });
  }
};
