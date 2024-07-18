import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import iconBar from '../../icons/iconBars.svg';
import iconUser from '../../icons/iconUser.svg';
import "./index.scss";

const Navbar = () => {

  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);

  if (!location || ["/login", "/register", "/"].includes(location.pathname)) {
    return null
  }

  return (
    <div className="nav-container">
      <div className="nav-block">
        <Link to={user ? '/dashboard' : '/login'}>
          <img src={iconBar} className="icon" alt="Dash" />
        </Link>
        <Link to={'/'}>
          <p className="name">DeliEdu</p>
        </Link>
        <Link to={user ? `/profile/${user.id}` : '/login'}>
          <img src={iconUser} className="icon" alt="Acc" />
        </Link>
      </div>
    </div>
  )
}

export default Navbar;