import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/assets/Menu";
import PagePerso from "../components/pageperso/pageperso";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
  path: "/pageperso",
  element: <PagePerso />,
},
]);
export default router;
