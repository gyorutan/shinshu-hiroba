import {getUserData} from "@/helper/getUserData";
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prismadb";

export const GET = async (request: NextRequest) => {
    try {
        const userInfo = getUserData(request);
        const user = await prisma.user.findUnique({where: {id: userInfo.id}});
        return NextResponse.json({message: "정보확인 성공", user});
    } catch (error: any) {
        return NextResponse.json({success: false, error: error.message});
    }
};
