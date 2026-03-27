import { Outlet } from "react-router-dom";
import { Box, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { NavBar } from "../components/navbar";
import { NavbarProvider, useNavbarController } from "../contexts/navbar/navbar_context";

function LayoutBody() {
  const { isOpen, onClose } = useNavbarController();
  const showSidebarFixed = useBreakpointValue({ base: false, md: true });

  return (
    <Grid
      w={"100%"}
      minH={"100vh"}
      backgroundColor={"myBlack.200"}
      templateColumns={{ base: "100%", md: "20% 80%" }}
    >
      <GridItem display={{ base: "none", md: "block" }}>
        <NavBar />
      </GridItem>
      <GridItem>
        <Outlet />
      </GridItem>

      {/* Drawer for mobile */}
      {!showSidebarFixed && (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="myBlack.100">
            <DrawerBody p={0}>
              <NavBar />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Grid>
  );
}

export function MainLayout() {
  return (
    <NavbarProvider>
      <LayoutBody />
    </NavbarProvider>
  );
}
