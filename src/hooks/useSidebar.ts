import { useContext } from "react";
import { Side } from "../context/SidebarContext";
export function useSidebar() {
  const context = useContext(Side);
  if (!context) {
    throw new Error("useSidebar must be used within SideBar provider");
  }
  return context;
}
