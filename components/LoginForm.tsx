import Link from "next/link";
import { Button } from "./ui/button";

const LoginForm = () => {
  return (
    <>
      <form className="p-20 flex flex-col gap-10 w-full">
        <p className="text-2xl font-black text-center">로그인</p>
        <>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <label
                  htmlFor="studentId"
                  className="absolute left-3 top-2 font-bold text-sm"
                >
                  학번
                </label>
                <input
                  // value={formData.sei}
                  // onChange={(e) => {
                  //   setFormData({
                  //     ...formData,
                  //     sei: e.target.value,
                  //   });
                  // }}
                  id="studentId"
                  name="studentId"
                  required
                  type="text"
                  className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md transition"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="absolute left-3 top-2 font-bold text-sm"
                >
                  비밀번호
                </label>
                <input
                  // value={formData.mei}
                  // onChange={(e) => {
                  //   setFormData({
                  //     ...formData,
                  //     mei: e.target.value,
                  //   });
                  // }}
                  id="password"
                  name="password"
                  required
                  type="password"
                  className="tracking-[4px] bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md transition"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                type="submit"
                // onClick={() => {
                //   if (formData.sei === "" || formData.mei === "") {
                //     toast.error("お名前を入力してください！", {
                //       duration: 3000,
                //       position: "top-right",
                //     });
                //     return;
                //   }
                //   handleNextScreen();
                // }}
                className="w-full"
              >
                확인
              </Button>
            </div>
          </div>
        </>

        {/* ScreenNumber 2 username, studentId */}

        {/* <div className="flex gap-3">
            <div className="relative">
              <label
                htmlFor="sei"
                className="absolute left-3 top-2 font-medium text-sm"
              >
                姓（カナ）
              </label>
              <input
                // value={reservationData.writer}
                // onChange={(e) => {
                //   setReservationData({
                //     ...reservationData,
                //     writer: e.target.value,
                //   });
                // }}
                id="sei"
                name="sei"
                required
                type="text"
                className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md transition"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="mei"
                className="absolute left-3 top-2 font-medium text-sm"
              >
                名（カナ）
              </label>
              <input
                // value={reservationData.writer}
                // onChange={(e) => {
                //   setReservationData({
                //     ...reservationData,
                //     writer: e.target.value,
                //   });
                // }}
                id="mei"
                name="mei"
                required
                type="text"
                className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md transition"
              />
            </div>
          </div> */}
        {/* ログイン情報 */}
        {/* <div className="flex flex-col gap-3">
            <div className="relative">
              <label
                htmlFor="username"
                className="absolute left-3 top-2 font-medium text-sm"
              >
                ハンドルネーム
              </label>
              <input
                // value={reservationData.writer}
                // onChange={(e) => {
                //   setReservationData({
                //     ...reservationData,
                //     writer: e.target.value,
                //   });
                // }}
                id="username"
                name="username"
                required
                type="text"
                className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md transition"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="studentId"
                className="absolute left-3 top-2 font-medium text-sm"
              >
                学籍番号
              </label>
              <input
                // value={reservationData.writer}
                // onChange={(e) => {
                //   setReservationData({
                //     ...reservationData,
                //     writer: e.target.value,
                //   });
                // }}
                id="studentId"
                name="studentId"
                required
                type="text"
                className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md transition"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="absolute left-3 top-2 font-medium text-sm"
              >
                パスワード
              </label>
              <input
                // value={reservationData.writer}
                // onChange={(e) => {
                //   setReservationData({
                //     ...reservationData,
                //     writer: e.target.value,
                //   });
                // }}
                id="password"
                name="password"
                required
                type="password"
                className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md tracking-[4px] transition"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password-check"
                className="absolute left-3 top-2 font-medium text-sm"
              >
                パスワード確認
              </label>
              <input
                // value={reservationData.writer}
                // onChange={(e) => {
                //   setReservationData({
                //     ...reservationData,
                //     writer: e.target.value,
                //   });
                // }}
                id="password-check"
                name="passwordCheck"
                required
                type="password"
                className="bg-white w-full pt-9 pb-3 px-3 text-lg font-bold border border-slate-300 hover:border-slate-400 focus:border-emerald-500 outline-none rounded-md shadow-md tracking-[4px] transition"
              />
            </div>
          </div> */}
        {/* <Button type="submit">登録</Button> */}
      </form>
    </>
  );
};

export default LoginForm;
