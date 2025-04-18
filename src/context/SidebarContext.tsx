import { createContext, ReactNode, useState } from "react";
interface ISidebarContext {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export const Side = createContext<ISidebarContext | undefined>(undefined);

export default function SideBar({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Side.Provider value={{ isOpen, setIsOpen }}>{children}</Side.Provider>
  );
}
