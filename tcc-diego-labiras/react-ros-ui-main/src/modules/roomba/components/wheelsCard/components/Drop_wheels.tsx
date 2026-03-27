import { Box, Flex, FlexProps, Tooltip } from "@chakra-ui/react";
import { useCallback, useMemo, useEffect } from "react";

interface DropWheelsProps extends FlexProps {
  drop_left: boolean;
  drop_right: boolean;
}

export function DropWheels({
  drop_left,
  drop_right,
  ...props
}: DropWheelsProps) {
  const handleChangeColors = (value: boolean) =>
    value ? "myGreen.200" : "myRed.400";

  const colors = {
    left: useMemo(() => handleChangeColors(drop_left), [drop_left]),
    right: useMemo(() => handleChangeColors(drop_right), [drop_right]),
  };

  return (
    <Flex {...props}>
      <Tooltip label={"Roda Esquerda"} hasArrow backgroundColor={"myBlack.100"}>
        <Box
          backgroundColor={colors.left}
          borderWidth={"1px"}
          borderColor={"myBlack.100"}
          // borderRightColor={"myBlack.100"}
          // borderWidth={"2px"}
          borderLeftRadius={"md"}
          w={"100%"}
        />
      </Tooltip>
      <Tooltip label={"Roda Direita"} hasArrow backgroundColor={"myBlack.100"}>
        <Box
          backgroundColor={colors.right}
          borderWidth={"1px"}
          borderColor={"myBlack.100"}
          borderRightRadius={"md"}
          w={"100%"}
        />
      </Tooltip>
    </Flex>
  );
}
