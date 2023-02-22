import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateAccount from "../components/createAccount/createAccount";
import Home from "../components/home/home";
import PagePerso from "../components/pageperso/accueil/pageperso";
import Error from "../assets/error/error";
import CreatePost from "../components/pageperso/createPost/createPost";
import UserProfile from "../components/pageperso/userProfile/userProfile";

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
    path: "/postCreation",
    element: <CreatePost />,
    errorElement: <Error />,
  },
  {
    path: "/myprofile",
    element: <UserProfile />,
    errorElement: <Error />,
  },
]);

export default router;
