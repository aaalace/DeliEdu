import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import "./index.scss"

const Navbar = () => {

  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);

  if (!location || ["/login", "/register", "/"].includes(location.pathname)) {
    return null
  }

  return (
    <div className="nav-container">
      <div className="nav-block">
        <Link to={'/'}>
          <p>Домой</p>
        </Link>
        <Link to={user ? '/dashboard' : '/login'}>
          <p>Дашборд</p>
        </Link>
        <Link to={user ? `/profile/${user.id}` : '/login'}>
          <p>Профиль</p>
        </Link>
      </div>
    </div>
  )
}

export default Navbar;