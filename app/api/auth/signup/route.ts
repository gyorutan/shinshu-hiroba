import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
  try {
    const { sei, mei, username, studentId, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        sei,
        mei,
        fullname: `${sei}` + " " + `${mei}`,
        username,
        studentId,
        email: `${studentId}` + "@shinshu-u.ac.jp",
        password: hashedPassword,
      },
    });

    console.log(createdUser);

    return NextResponse.json({
      success: true,
      message: "회원가입에 성공하였습니다",
      createdUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "알 수 없는 오류" });
  }
};
