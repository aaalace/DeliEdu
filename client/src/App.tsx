import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";
import Navbar from "./components/general/navbar/Navbar.tsx";
import AuthProvider from "./components/general/authProvider/AuthProvider.tsx";
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {

  return (
    <div className="App">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <AppRouter/>
        </BrowserRouter>
      </AuthProvider>
      </GoogleOAuthProvider>
    </div>
  )
}

export default App;