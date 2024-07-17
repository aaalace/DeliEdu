import { GoogleLogin } from "@react-oauth/google";
import { GoogleAuthRequest } from "../../types/requests/googleAuthRequest.ts";
import { AuthResponse } from "../../types/responses/authResponse.ts";
import { googleAuth } from "../../api/authApi.ts";
import { authSuccess } from "../../store/slices/authSlice.ts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorBlock from "../general/errorBlock/ErrorBlock.tsx";

const GoogleAuth = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState<string>('');

  const googleAuthProcess = async (googleAuthRequest: GoogleAuthRequest) => {
    const [state, data]: [boolean, (AuthResponse | string)] = await googleAuth(googleAuthRequest);
    if (state) {
      setError('')
      await dispatch(authSuccess(data as AuthResponse));
      navigate('/dashboard');
    } else {
      setError(data as string);
    }
  }

  const handleGoogleLoginSuccess = (response: any) => {
    googleAuthProcess(response).then()
  }

  const handleGoogleLoginFailure = () => {
    setError('troubles on google side, try common auth')
  }

  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: '100%'}}>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginFailure}
      />
      {error.length > 0 ? <ErrorBlock message={error}/> : null}
    </div>
  )
}

export default GoogleAuth;