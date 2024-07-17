import { MouseEvent, useEffect, useState } from "react";
import { loginApi } from "../../api/authApi.ts";
import { AppDispatch, useTypedSelector } from "../../store/store.ts";
import { useDispatch } from "react-redux";
import { LoginRequest } from "../../types/requests/loginRequest.ts";
import { authSuccess } from "../../store/slices/authSlice.ts";
import { AuthResponse } from "../../types/responses/authResponse.ts";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../../components/googleAuth/GoogleAuth.tsx";
import ErrorBlock from "../../components/general/errorBlock/ErrorBlock.tsx";
import Input from "../../components/general/input/Input.tsx";
import Button from "../../components/general/button/Button.tsx";
import CustomHR from "../../components/general/customHR/CustomHR.tsx";
import "./index.scss"
import AuthDescriber from "../../components/authDescriber/AuthDescriber.tsx";

const Login = () => {

  const navigate = useNavigate();

  const authenticated = useTypedSelector(state => state.auth.accessToken);
  const user = useTypedSelector(state => state.auth.user);
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (authenticated && user) {
      navigate(`/profile/${user.id}`);
    }
  }, [authenticated]);

  const entry = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const loginRequest: LoginRequest = {email, password};
    const [state, data]: [boolean, (AuthResponse | string)] = await loginApi(loginRequest);
    if (state) {
      setError('');
      dispatch(authSuccess(data as AuthResponse));
      navigate('/dashboard');
    } else {
      setError(data as string);
    }
  }

  return (
    <div className="login-page">
      <AuthDescriber width="30vw"/>
      <div className="ad-del"></div>
      <div className="login-container">
        <h1>Sign in</h1>
        <GoogleAuth/>
        <CustomHR text="or"/>
        <div>
          <Input label="Email" type="email" value={email} setValue={setEmail}/>
          <Input label="Password" type="password" value={password} setValue={setPassword}/>
          <div className="button-container">
            <Button text="Sign in" onClick={entry}/>
          </div>
          {error.length > 0 ? <ErrorBlock message={error}/> : <ErrorBlock message={''}/>}
        </div>
      </div>
    </div>
  )
}

export default Login