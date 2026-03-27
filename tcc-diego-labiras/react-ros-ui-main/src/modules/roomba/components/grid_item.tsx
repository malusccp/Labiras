import { GridItem, type ComponentWithAs, type GridItemProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface ItemProps extends GridItemProps {
  children: ReactNode;

}

export function Item({ children, ...rest }: ItemProps) {
  return (
    <GridItem
      {...rest}
      backgroundColor={"myBlack.300"}
      color={"myWhite.100"}
      borderRadius={"lg"}
    >
      {children}
    </GridItem>
  );
}
