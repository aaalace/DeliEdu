import { app } from "../lib/axios.ts";
import User from "../types/entities/user";

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