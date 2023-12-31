import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";

export const getUserData = (request: NextRequest) => {
    try {
        const token = request.cookies.get("user_token")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        return decodedToken;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
