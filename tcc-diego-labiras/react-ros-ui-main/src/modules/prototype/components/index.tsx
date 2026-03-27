import { GridItem } from "@chakra-ui/react";
import { ChildrenNode } from "../../../../models/generic/children_node";

export const GridCard = ({ children }: ChildrenNode) => {
  return (
    <GridItem w={"100%"} borderRadius={"lg"} border={"2px solid #CDCCCD"} p={"1rem"}>
      {children}
    </GridItem>
  );
};
