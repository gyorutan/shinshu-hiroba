import UserInfo from "@/components/UserInfo";

const UserPage = () => {
  return (
    <div className="h-screen flex flex-col gap-10 justify-center items-center">
      <p className="text-3xl font-black">프로필 페이지</p>
      <UserInfo />
    </div>
  );
};

export default UserPage;
