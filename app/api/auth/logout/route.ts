import {NextResponse} from "next/server";

export const GET = () => {
    try {
        const response = NextResponse.json({
            success: true,
            message: "로그아웃하였습니다",
        });

        response.cookies.set("user_token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({success: false, error: error.message});
    }
};
