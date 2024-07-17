import { MouseEvent, useEffect, useState } from "react";
import { registerApi } from "../../api/authApi.ts";
import { AuthResponse } from "../../types/responses/authResponse.ts";
import { authSuccess } from "../../store/slices/authSlice.ts";
import { RegisterRequest } from "../../types/requests/registerRequest.ts";
import { AppDispatch, useTypedSelector } from "../../store/store.ts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../../components/googleAuth/GoogleAuth.tsx";
import ErrorBlock from "../../components/general/errorBlock/ErrorBlock.tsx";
import CityAutocomplete from "../../components/cityAutocomplete/CityAutocomplete.tsx";
import Input from "../../components/general/input/Input.tsx";
import Button from "../../components/general/button/Button.tsx";
import CustomHR from "../../components/general/customHR/CustomHR.tsx";
import "./index.scss"
import AuthDescriber from "../../components/authDescriber/AuthDescriber.tsx";

const Register = () => {

  const navigate = useNavigate();

  const authenticated = useTypedSelector(state => state.auth.accessToken);
  const user = useTypedSelector(state => state.auth.user);
  const dispatch: AppDispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [defaultCity, setDefaultCity] = useState('');

  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (authenticated && user) {
      navigate(`/profile/${user.id}`);
    }
  }, [authenticated]);

  const entry = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const registerRequest: RegisterRequest = {name, email, password, defaultCity};
    const [state, data]: [boolean, (AuthResponse | string)] = await registerApi(registerRequest);
    if (state) {
      setError('');
      await dispatch(authSuccess(data as AuthResponse));
      navigate('/dashboard');
    } else {
      setError(data as string);
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Sign up</h1>
        <GoogleAuth/>
        <CustomHR text="or"/>
        <div>
          <Input label="Name" type="text" value={name} setValue={setName}/>
          <Input label="Email" type="email" value={email} setValue={setEmail}/>
          <Input label="Password" type="password" value={password} setValue={setPassword}/>
          <CityAutocomplete setSelectedCity={setDefaultCity}/>
          <div className="button-container">
            <Button text="Sign up" onClick={entry}/>
          </div>
          {error.length > 0 ? <ErrorBlock message={error}/> : <ErrorBlock message={''}/>}
        </div>
      </div>
      <div className="ad-del"></div>
      <AuthDescriber width="30vw"/>
    </div>
  )
}

export default Register