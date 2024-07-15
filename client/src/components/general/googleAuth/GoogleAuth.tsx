import { GoogleLogin } from "@react-oauth/google";
import { GoogleAuthRequest } from "../../../types/requests/googleAuthRequest.ts";
import { AuthResponse } from "../../../types/responses/authResponse.ts";
import { googleAuth } from "../../../api/authApi.ts";
import { authSuccess } from "../../../store/slices/authSlice.ts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleAuthProcess = async (googleAuthRequest: GoogleAuthRequest) => {
    console.log(googleAuthRequest);
    const data: AuthResponse | null = await googleAuth(googleAuthRequest);
    if (data) {
      await dispatch(authSuccess(data));
      navigate('/dashboard');
    }
  }

  const handleGoogleLoginSuccess = (response) => {
    googleAuthProcess(response).then()
  }

  const handleGoogleLoginFailure = () => {
    console.error('Login Failed');
  }

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginFailure}
      />
    </div>
  )
}

export default GoogleAuth;