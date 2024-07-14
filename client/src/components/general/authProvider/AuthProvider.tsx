import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { refreshTokenApi } from "../../../api/authApi";
import { authSuccess } from "../../../store/slices/authSlice";
import { AuthResponse } from "../../../types/responses/authResponse.ts";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    const data: AuthResponse | null = await refreshTokenApi();
    if (data) {
      await dispatch(authSuccess(data));
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      refreshToken().then()
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};

export default AuthProvider;
