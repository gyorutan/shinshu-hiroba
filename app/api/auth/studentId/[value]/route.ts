import prisma from "@/lib/prismadb";
import {NextResponse} from "next/server";

interface Params {
    value?: string;
}

export const GET = async (request: Request, {params}: { params: Params }) => {
    try {
        const {value} = params;
        const user = await prisma.user.findUnique({
            where: {
                studentId: value
            }
        })

        console.log(user);

        if (user) {
            return NextResponse.json({success: false, result: "unavailable-studentId"})
        }

        return NextResponse.json({success: true, result: "available-studentId"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: "알 수 없는 오류"})
    }
}
