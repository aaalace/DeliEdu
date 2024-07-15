import { MouseEvent, useEffect, useState } from "react";
import { loginApi } from "../../api/authApi.ts";
import { AppDispatch } from "../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { LoginRequest } from "../../types/requests/loginRequest.ts";
import { authSuccess } from "../../store/slices/authSlice.ts";
import { AuthResponse } from "../../types/responses/authResponse.ts";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../../components/general/googleAuth/GoogleAuth.tsx";

const Login = () => {

  const navigate = useNavigate();

  const authenticated = useSelector(state => state.auth.accessToken);
  const user = useSelector(state => state.auth.user);
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (authenticated) {
      navigate(`/profile/${user.id}`);
    }
  }, [authenticated]);

  const entry = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const loginRequest: LoginRequest = {email, password};
    const data: AuthResponse | null = await loginApi(loginRequest);
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
      <h1>логин</h1>
      <GoogleAuth/>
      <div>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
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

export default Login