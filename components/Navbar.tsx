import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <>
      <div className="border-b shadow-sm fixed flex justify-between items-center top-0 w-full max-w-[768px] min-w-[375px] m-auto bg-white py-2 px-4">
        <Link href={"/"} className="text-lg font-black">
          히로바
        </Link>
        <Button className="bg-green-600 hover:bg-green-500 font-bold">메뉴</Button>
      </div>
    </>
  );
};

export default Navbar;
