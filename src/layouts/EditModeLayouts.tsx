import { ReactNode } from "react";
import Navbar from "../components/dashboard/Navbar";
import RightSidebar from "../components/dashboard/RightSidebar";
import LeftSidebar from "../components/dashboard/LeftSidebar";
import { useSidebar } from "../hooks/useSidebar";

export default function EditModeLayouts({ children }: { children: ReactNode }) {
  const { isOpen } = useSidebar();
  return (
    <>
      <Navbar />
      <LeftSidebar />
      <RightSidebar />
      <div className={`mt-16 duration-300 ${isOpen ? "ms-44" : "ms-20"}`}>
        {children}
      </div>
    </>
  );
}
