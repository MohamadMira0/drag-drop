import sidebarIcon from "../../assets/icons/sidebar.svg";
import logo from "../../assets/logo.svg";
import { useSidebar } from "../../hooks/useSidebar";

export default function LeftSidebar() {
  const { isOpen, setIsOpen } = useSidebar();
  return (
    <>
      <div
        className={`flex flex-col duration-300 ${
          isOpen ? "w-40" : "w-15"
        } bg-layout fixed left-0 top-0 h-screen z-10`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="py-[11px] px-4 text-white flex items-center gap-4 z-20 shadow-custom"
        >
          <img src={sidebarIcon} alt="Open-sidebar" />
          <img className="w-20 max-w-3xs ms-1" src={logo} alt="logo" />
        </button>
      </div>
    </>
  );
}
