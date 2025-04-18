import { ReactNode } from "react";
import LeftSidebar from "../components/dashboard/LeftSidebar";
import Navbar from "../components/dashboard/Navbar";
import { useSidebar } from "../hooks/useSidebar";
import { Link } from "react-router";
import editIcon from "../assets/icons/edit.svg";

export default function DashboardLayouts({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen } = useSidebar();
  return (
    <>
      <Navbar />
      <LeftSidebar />
      <div className={`mt-16 duration-300 ${isOpen ? "ms-44" : "ms-20"}`}>
        {children}
        <Link
          to={"/edit-mode"}
          className="fixed bottom-8 right-4 bg-warning duration-300 hover:bg-warning/80 p-3 rounded-lg group"
        >
          <img src={editIcon} alt="Edit Icon" />
        </Link>
      </div>
    </>
  );
}
