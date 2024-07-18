import User from "../entities/user.ts";

export interface AuthResponse {
  user: User,
  accessToken: string
}