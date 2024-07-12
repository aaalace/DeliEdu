import UserResponse from "../types/responses/userResponse";
import User from "../types/entitites/user";
import { toUserResponse } from "./toUserResponse";

export function toUsersResponse(users: User[]): UserResponse[] {
  return users.map(toUserResponse);
}