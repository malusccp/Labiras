import { useState } from "react";

export const useNavbar = () => {
const [isOpen, setIsOpen] = useState(false);

return {
    isOpen,
    setIsOpen
}
}