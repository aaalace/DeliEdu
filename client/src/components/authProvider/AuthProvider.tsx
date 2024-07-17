import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { refreshTokenApi } from "../../api/authApi.ts";
import { authSuccess } from "../../store/slices/authSlice.ts";
import { AuthResponse } from "../../types/responses/authResponse.ts";

interface AuthProviderProps {
  children?: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    const [state, data]: [boolean, (AuthResponse | string)] = await refreshTokenApi();
    if (state) {
      await dispatch(authSuccess(data as AuthResponse));
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      refreshToken().then()
    }
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};

export default AuthProvider;
