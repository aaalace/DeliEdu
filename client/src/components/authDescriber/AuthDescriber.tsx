import './index.scss'
import { Link } from 'react-router-dom';

interface AuthDescriberProps {
  width: string
}

const AuthDescriber = (props: AuthDescriberProps) => {

  return (
    <div className="ad-container" style={{width: props.width}}>
      <div className="ad-header">
        <p className="icon">DeliEdu</p>
      </div>
      <div className="ad-body">
        <div className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
      </div>
      <div className="ad-footer">
        <Link className="bar" to='/'>Home</Link>
        <Link className="bar" to='/login'>Login</Link>
        <Link className="bar" to='/register'>Register</Link>
      </div>
    </div>
  );
}

export default AuthDescriber