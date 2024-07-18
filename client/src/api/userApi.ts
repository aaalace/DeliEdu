import { app, authApp } from "../lib/axios.ts";
import User from "../types/entities/user.ts";
import { ChangeCityRequest } from "../types/requests/changeCityRequest.ts";
import { AuthResponse } from "../types/responses/authResponse.ts";

const privateApiOptions = {
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
}

export const getUserById = async (userId: number): Promise<[boolean, (User | string)]> => {
  try {
    const response = await app.get(`/users/${userId}`);
    return [true, response.data];
  } catch (error: any) {
    return [false, error.response?.data.message || "internal server error"];
  }
}

export const changeCityApi = async (changeCityRequest: ChangeCityRequest): Promise<[boolean, (User | string)]> => {
  try {
    const response = await authApp.patch(`/users/changeCity`, changeCityRequest, privateApiOptions);
    const data: AuthResponse = response.data;
    localStorage.setItem('accessToken', data.accessToken);
    return [true, data.user];
  } catch (error: any) {
    return [false, error.response?.data.message || "internal server error"];
  }
}