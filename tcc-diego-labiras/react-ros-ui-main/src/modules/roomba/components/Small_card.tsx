import { Stack, StackProps, Text } from "@chakra-ui/react";

interface SmallCardProps extends StackProps {
  title: string;
  children: React.ReactNode;
}

// Responsible for temperature, current and voltage
export const SmallCard = ({ children, title, ...props }: SmallCardProps) => {
  return (
    <Stack
      w={"100%"}
      h={"100%"}
      backgroundColor={"myBlack.300"}
      alignItems={"center"}
      justifyContent={"center"}
      p={"1rem"}
      borderRadius={"md"}
      color={"myBlack.900"}
      {...props}
      position={"relative"}
      opacity={"1"}
      transition={"opacity 0.3s ease"}
      _hover={{ opacity: "0.8" }}
    >
      <Text
        fontSize={10}
        w={"100%"}
        textAlign={"start"}
        position={"absolute"}
        top={1}
        left={1}
      >
        {title}
      </Text>
      <Text>{children}</Text>
    </Stack>
  );
};
