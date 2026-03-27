import { createContext, ReactNode, useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";

type NavbarContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const NavbarContext = createContext<NavbarContextType>({} as NavbarContextType);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <NavbarContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </NavbarContext.Provider>
  );
}

export const useNavbarController = () => useContext(NavbarContext);


