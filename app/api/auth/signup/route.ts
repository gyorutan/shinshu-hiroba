import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const fullname = body.sei + " " + body.mei;

    const email = body.studentId + "@shinshu-u.ac.jp";

    const { username, studentId, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const createdUser = await prisma.user.create({
      data: {
        fullname,
        username,
        studentId,
        email,
        password: hashedPassword,
      },
    });

    console.log(createdUser);

    return NextResponse.json({ success: true, message: "성공", createdUser });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "서버 에러" });
  }
};
