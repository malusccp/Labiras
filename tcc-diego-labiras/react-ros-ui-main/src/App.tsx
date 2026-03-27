import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import ROSProvider from "./shared/contexts/ros/ros_provider";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ROSProvider>
          <RouterProvider router={routes} />
        </ROSProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
