import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store.ts";
import { useEffect } from "react";

const Navbar = () => {

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
      <Link to={'/'}>
        <p>Домой</p>
      </Link>
      <Link to={'/login'}>
        <p>Логин</p>
      </Link>
      <Link to={'/register'}>
        <p>Зарегаться</p>
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