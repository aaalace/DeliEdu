import { Link } from "react-router-dom";
import ThreeFigure from "../../components/globus/Globus.tsx";
import BigButton from "../../components/general/bigButton/BigButton.tsx";
import "./index.scss"

const Home = () => {

  return (
    <div className="home-page">
      <h1>DeliEdu</h1>
      <div className="bottom-container">
        <div className="data-container">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          <Link style={{textDecoration: "none"}} to="/login"><BigButton text="Explore invites" onClick={() => {}}/></Link>
        </div>
        <ThreeFigure/>
      </div>
    </div>
  )
}

export default Home