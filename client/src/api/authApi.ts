import { app } from "../lib/axios.ts"
import { LoginRequest } from "../types/requests/loginRequest.ts";
import { RegisterRequest } from "../types/requests/registerRequest.ts";
import { AuthResponse } from "../types/responses/authResponse.ts";

const authApiOptions = {
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
}

export const registerApi = async (data: RegisterRequest): Promise<AuthResponse | null> => {
  try {
    const response = await app.post('users/register', data, authApiOptions);
    if (response.status == 200) {
      const data: AuthResponse = response.data;
      localStorage.setItem('accessToken', data.accessToken);
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const loginApi = async (data: LoginRequest): Promise<AuthResponse | null> => {
  try {
    const response = await app.post('users/login', data, authApiOptions);
    if (response.status == 200) {
      const data: AuthResponse = response.data;
      localStorage.setItem('accessToken', data.accessToken);
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const refreshTokenApi = async (): Promise<AuthResponse | null> => {
  try {
    const response = await app.get('users/refresh', authApiOptions);
    if (response.status == 200) {
      const data: AuthResponse = response.data;
      localStorage.setItem('accessToken', data.accessToken);
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const logoutApi = async (): Promise<boolean> => {
  try {
    const response = await app.get('users/logout', authApiOptions);
    if (response.status == 200) {
      localStorage.removeItem('accessToken');
      return true;
    }
  } catch (error) {
    return false;
  }
}