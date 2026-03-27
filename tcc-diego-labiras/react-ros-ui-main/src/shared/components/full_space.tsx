import { ChildrenNode } from "../../models/generic/children_node";
import { Box } from "@chakra-ui/react";

 
export const FullSpace = ({children}: ChildrenNode)  => {
  return <Box>
    {children}
  </Box>
}