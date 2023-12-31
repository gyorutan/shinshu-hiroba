"use client";

import {useEffect, useState} from "react";
import axios from "axios";

interface UserProps {
    id: string;
    fullname: string;
    username: string;
    studentId: string;
    email: string;
}

const UserInfo = () => {
    const [user, setUser] = useState<UserProps | null>(null);

    const getUser = async () => {
        const response = await axios.get('/api/user');
        const result = response.data;

        const user = result.user

        if (!user) {
            return
        }

        console.log(result);
        setUser(result.user)
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <div className="text-2xl font-bold">
                {user ? (
                    <>
                        <p>ID : {user?.id}</p>
                        <p>이름 : {user?.fullname}</p>
                        <p>닉네임 : {user?.username}</p>
                        <p>학번 : {user?.studentId}</p>
                        <p>이메일 : {user?.email}</p>
                    </>
                ) : (
                    <p>로그인을 해주세요</p>
                )}
            </div>
        </>
    );
};

export default UserInfo;
