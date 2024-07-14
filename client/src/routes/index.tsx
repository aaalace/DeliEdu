import { Route, Routes } from "react-router-dom";
import publicRoutes from "./routes/publicRoutes.tsx";
import privateRoutes from "./routes/privateRoutes.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

const AppRouter = () => {

  const authenticated = useSelector((state: RootState) => state.auth.accessToken);

  return (
    <Routes>
      {authenticated && privateRoutes.map(({ path, element }) => {
        return <Route key={path} path={path} element={element}/>
      })}

      {publicRoutes.map(({ path, element }) => {
        return <Route key={path} path={path} element={element}/>
      })}

      <Route path="*" element={<p>Page not found</p>}/>
    </Routes>
  )
}

export default AppRouter