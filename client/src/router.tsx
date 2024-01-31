import { createBrowserRouter, RouteProps } from "react-router-dom";
import NotFound from "./not-found";
import Root from "./root";
import MainLayout from "./layout/main-layout";

interface Route {
  path: string;
  element: React.ReactNode | React.ReactElement<RouteProps>;
  children?: Route[];
}

const router: Route[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

const createdRouter = createBrowserRouter(router);

export default createdRouter;
