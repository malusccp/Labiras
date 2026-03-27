import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../modules/homePage";
// import { Robots } from "../modules/robots";
import {MainLayout} from "../shared/layouts/main_layout";
import { Roomba } from "../modules/roomba";
import { BrowseTopics } from "../modules/browseTopics";
// import { Prototype } from "../modules/prototype";
import { RobotsTopic } from "../modules/robotsTopic";
import { RoombaControl } from "../modules/roombaControl";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/roomba", element: <Roomba /> },
      { path: "/robots", element: <BrowseTopics /> },
      { path: "/robots/:path", element: <RobotsTopic /> },
      { path: "/roomba/control", element: <RoombaControl /> },
      // { path: "/robots/prototype", element: <Prototype /> },
      // { path: "/robots/:id", element: <RobotPage /> },
    ],
  },
]);
