import User from "../entities/user.ts";

export interface AuthState {
  user: User | null,
  accessToken: string | null
}