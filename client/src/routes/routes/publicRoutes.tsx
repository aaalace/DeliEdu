import { RouteObject } from "react-router";
import Home from "../../pages/home/Home.tsx";
import Login from "../../pages/login/Login.tsx";
import Register from "../../pages/register/Register.tsx";
import {
  HOME_PATH,
  LOGIN_PATH,
  REGISTER_PATH
} from "../consts.ts";

const publicRoutes: RouteObject[] = [
  {
    path: HOME_PATH,
    element: <Home/>
  },
  {
    path: LOGIN_PATH,
    element: <Login/>
  },
  {
    path: REGISTER_PATH,
    element: <Register/>
  }
];

export default publicRoutes;