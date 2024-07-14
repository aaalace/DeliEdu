import User from "../entities/user";

export interface AuthState {
  user: User | null,
  accessToken: string | null
}