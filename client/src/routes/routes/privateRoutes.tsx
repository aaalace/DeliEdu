import { RouteObject } from "react-router";
import Dashboard from "../../pages/dashboard/Dashboard.tsx";
import Profile from "../../pages/profile/Profile.tsx";
import {
  DASHBOARD_PATH,
  PROFILE_PATH
} from "../consts.ts";

const privateRoutes: RouteObject[] = [
  {
    path: DASHBOARD_PATH,
    element: <Dashboard/>,
  },
  {
    path: PROFILE_PATH,
    element: <Profile/>,
  }
];

export default privateRoutes;