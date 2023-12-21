import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getCurrentUser = (request: NextRequest) => {
  try {
    const token = request.cookies.get("USER_TOKEN")?.value || "";
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
      console.log("decodedToken", decodedToken);
      return decodedToken;
    }

    if (token === "") {
      return "로그인해주세요";
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
