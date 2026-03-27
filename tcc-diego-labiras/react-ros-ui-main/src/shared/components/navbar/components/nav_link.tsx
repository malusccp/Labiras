import { Icon, Link, Text, type LinkProps } from "@chakra-ui/react";
import { useMemo } from "react";
import type { IconType } from "react-icons/lib";
import { useLocation } from "react-router-dom";

interface NavLinkProps extends LinkProps {
  icon: IconType;
  text: string;
}

export function NavLink({ icon, text, href, ...rest }: NavLinkProps) {
  const currentLocation = useLocation().pathname;

  const selectedUrl = useMemo(() => {
    return href === currentLocation;
  }, [currentLocation]);

  return (
    <Link
      display={"flex"}
      alignItems={"center"}
      gap={".5rem"}
      color={"myWhite.100"}
      p={3}
      _hover={{
        backgroundColor: "myBlack.300",
        color: "myWhite.200",
      }}
      {...(selectedUrl
        ? { backgroundColor: "myBlack.300", color: "myWhite.200" }
        : null)}
      w={"100%"}
      borderRadius={"lg"}
      {...{ rest, href }}
    >
      <Icon as={icon} boxSize={{base: 6, md: 5}} />
      <Text fontSize={{base: "12px" ,md: "10px", md: "15px"}}>{text}</Text>
    </Link>
  );
}
