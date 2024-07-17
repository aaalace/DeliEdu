import { app } from "../lib/axios.ts"
import { LoginRequest } from "../types/requests/loginRequest.ts";
import { RegisterRequest } from "../types/requests/registerRequest.ts";
import { AuthResponse } from "../types/responses/authResponse.ts";
import { GoogleAuthRequest } from "../types/requests/googleAuthRequest.ts";

const privateApiOptions = {
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
}

export const googleAuth = async (reqData: GoogleAuthRequest): Promise<[boolean, (AuthResponse | string)]> => {
  try {
    const response = await app.post('users/googleAuth', reqData, privateApiOptions);
    const data: AuthResponse = response.data;
    localStorage.setItem('accessToken', data.accessToken);
    return [true, data];
  } catch (error: any) {
    return [false, error.response?.data.message || "internal server error"];
  }
}

export const registerApi = async (reqData: RegisterRequest): Promise<[boolean, (AuthResponse | string)]> => {
  try {
    const response = await app.post('users/register', reqData, privateApiOptions);
    const data: AuthResponse = response.data;
    localStorage.setItem('accessToken', data.accessToken);
    return [true, data];
  } catch (error: any) {
    return [false, error.response?.data.message || "internal server error"];
  }
}

export const loginApi = async (reqData: LoginRequest): Promise<[boolean, (AuthResponse | string)]> => {
  try {
    const response = await app.post('users/login', reqData, privateApiOptions);
    const data: AuthResponse = response.data;
    localStorage.setItem('accessToken', data.accessToken);
    return [true, data];
  } catch (error: any) {
    return [false, error.response?.data.message || "internal server error"];
  }
}

// refreshing access token using refresh
export const refreshTokenApi = async (): Promise<[boolean, (AuthResponse | string)]> => {
  try {
    const response = await app.get('users/refresh', privateApiOptions);
    const data: AuthResponse = response.data;
    localStorage.setItem('accessToken', data.accessToken);
    return [true, data];
  } catch (error: any) {
    return [false, error.response?.data.message || "internal server error"];
  }
}

export const logoutApi = async (): Promise<[boolean, string?]> => {
  try {
    await app.get('users/logout', privateApiOptions);
    localStorage.removeItem('accessToken');
    return [true, ''];
  } catch (error: any) {
    return [false, error.response?.data.message || "internal server error"];
  }
}