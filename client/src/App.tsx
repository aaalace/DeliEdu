import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";
import Navbar from "./components/general/navbar/Navbar.tsx";
import AuthProvider from "./components/general/authProvider/AuthProvider.tsx";

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <AppRouter/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App;