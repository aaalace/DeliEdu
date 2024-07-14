import UserResponse from "../responses/userResponse";

export interface AddInviteBody {
  userFromToken: UserResponse;
  userId: number,
  city: string,
  dt: string,
  description: string,
  contacts: string
}