import { extendTheme } from "@chakra-ui/react";
import '@fontsource/plus-jakarta-sans'
const theme = extendTheme({
  fonts: {
    // heading: `'Plus Jakarta Sans'`,
    body: `'Plus Jakarta Sans'`,
  },
  colors: {
    myBlack: {
      100: "#0C0B10",
      200: "#141418",
      300: "#1D1C21",
      900: "#1a202c",
    },
    myWhite: {
      100: "#CDCCCD",
      200: "#FFFFFF",
    },
    myOrange: {
      100: "#FF8D58",
    },
    myRed: {
      100: "#FF0000",
      400: "#b70922",
    },
    myGreen: {
      100: "#97BE5A",
      200: "#64A15F",
    },
    myYellow: {
      100: "#a3a32c",
    },
    myBlue: {
      50: "#4bc0c0",
      100: "#2121ef",

    },
  },
});

export { theme }