import UserResponse from "../types/responses/userResponse";
import User from "../types/entitites/user";

export function toUserResponse(user: User): UserResponse {
  const { id, name, email, defaultCity } = user;
  return { id, name, email, defaultCity };
}