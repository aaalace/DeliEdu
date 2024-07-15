import { MouseEvent, useEffect, useState } from "react";
import { registerApi } from "../../api/authApi.ts";
import { AuthResponse } from "../../types/responses/authResponse.ts";
import { authSuccess } from "../../store/slices/authSlice.ts";
import { RegisterRequest } from "../../types/requests/registerRequest.ts";
import { AppDispatch } from "../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../../components/general/googleAuth/GoogleAuth.tsx";

const Register = () => {

  const navigate = useNavigate();

  const authenticated = useSelector(state => state.auth.accessToken);
  const user = useSelector(state => state.auth.user);
  const dispatch: AppDispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [defaultCity, setDefaultCity] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (authenticated) {
      navigate(`/profile/${user.id}`);
    }
  }, [authenticated]);

  const entry = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const registerRequest: RegisterRequest = {name, email, password, defaultCity};
    const data: AuthResponse | null = await registerApi(registerRequest);
    if (data) {
      await dispatch(authSuccess(data));
      setError(false);
      navigate('/dashboard')
    } else {
      setError(true);
    }
  }

  return (
    <div>
      <h1>регистрация</h1>
      <GoogleAuth/>
      <div>
        name
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        city
        <input
          type="text"
          onChange={(e) => setDefaultCity(e.target.value)}
          value={defaultCity}
        />
        email
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        pass
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button onClick={entry}>ok</button>
        {error ? <p>error</p> : null}
      </div>
    </div>
  )
}

export default Register