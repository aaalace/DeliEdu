import {Link} from "react-router-dom";

const Navbar = () => {

  return (
    <div>
      <Link to={'/'}>
        <div>
          <h1>Домой</h1>
        </div>
      </Link>
      <Link to={'/login'}>
        <div>
          <h1>Войти</h1>
        </div>
      </Link>
      <Link to={'/register'}>
        <div>
          <h1>Зарегаться</h1>
        </div>
      </Link>
      <Link to={'/profile'}>
        <div>
          <h1>Профиль</h1>
        </div>
      </Link>
      <Link to={'/dashboard'}>
        <div>
          <h1>Дашборд</h1>
        </div>
      </Link>
    </div>
  )
}

export default Navbar;