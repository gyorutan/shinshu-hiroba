import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="layout max-w-[768px] min-w-[375px] min-h-screen m-auto">
        <Navbar />
        <main className="">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
