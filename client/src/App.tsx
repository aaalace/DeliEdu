import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";
import Navbar from "./components/markup/navbar/Navbar.tsx";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </div>
  )
}

export default App;