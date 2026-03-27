import { Text, type TextProps } from "@chakra-ui/react";

interface HeadingProps extends TextProps {}

export function Heading({ children, ...rest }: HeadingProps) {
  return (
    <Text fontSize={"xl"} color={"myWhite.100"} fontWeight={"semi"} {...rest}>
      {children}
    </Text>
  );
}
