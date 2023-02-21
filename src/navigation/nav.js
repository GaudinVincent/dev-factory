import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateAccount from "../components/createAccount/createAccount";
import Home from "../components/home/home";
import PagePerso from "../components/pageperso/pageperso";
import Error from "../assets/error/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/pageperso",
    element: <PagePerso />,
    errorElement: <Error />,
  },
  {
    path: "/createAccount",
    element: <CreateAccount />,
    errorElement: <Error />,
  },
  {
  path: "/pageperso",
  element: <PagePerso />,
},
]);
export default router;
