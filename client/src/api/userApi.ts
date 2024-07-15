import { app, authApp } from "../lib/axios.ts";
import User from "../types/entities/user";
import { ChangeCityRequest } from "../types/requests/changeCityRequest.ts";

const privateApiOptions = {
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
}

export const getUserById = async (userId: number): Promise<User | null> => {
  try {
    const response = await app.get(`/users/${userId}`);
    if (response.status == 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const changeCityApi = async (changeCityRequest: ChangeCityRequest): Promise<User | null> => {
  try {
    const response = await authApp.patch(`/users/changeCity`, changeCityRequest, privateApiOptions);
    if (response.status == 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}