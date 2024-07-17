import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";

const Navbar = () => {

  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);

  console.log(location.pathname)
  if (!location || ["/login", "/register"].includes(location.pathname)) {
    return null
  }

  return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", height: "10vh"}}>
      <Link to={'/'}>
        <p>Домой</p>
      </Link>
      <Link to={user ? `/profile/${user.id}` : '/login'}>
        <p>Профиль</p>
      </Link>
      <Link to={user ? '/dashboard' : '/login'}>
        <p>Дашборд</p>
      </Link>
    </div>
  )
}

export default Navbar;