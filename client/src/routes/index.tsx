import { Route, Routes } from "react-router-dom";
import publicRoutes from "./routes/publicRoutes.tsx";
import privateRoutes from "./routes/privateRoutes.tsx";

const AppRouter = () => {

  const authenticated = false;

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