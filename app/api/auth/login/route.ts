import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (request: Request) => {
  try {
    const { studentId, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        studentId: studentId,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "회원정보가 없습니다",
      });
    }

    const validatePassword = await bcrypt.compare(password, user.password!);

    if (!validatePassword) {
      return NextResponse.json({
        success: false,
        message: "비밀번호가 일치하지 않습니다",
      });
    }

    // CREATE TOKEN
    const tokenData = {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      studentId: user.studentId,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "2h",
    });

    const response = NextResponse.json({
      success: true,
      message: "로그인에 성공하였습니다",
      user,
    });

    response.cookies.set("USER_TOKEN", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "서버 에러",
    });
  }
};
