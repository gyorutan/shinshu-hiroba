import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    const { studentId, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        studentId,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "등록되지 않은 이메일입니다",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password!);

    if (!comparePassword) {
      return NextResponse.json({
        success: false,
        message: "비밀번호가 일치하지 않습니다",
      });
    }

    const payload = {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      studentId: user.studentId,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      success: true,
      message: "로그인에 성공하였습니다",
    });

    response.cookies.set("user_token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "알 수 없는 오류" });
  }
};
