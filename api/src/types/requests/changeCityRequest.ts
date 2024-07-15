import UserResponse from "../responses/userResponse";

interface ChangeCityRequest  {
  userFromToken: UserResponse,
  defaultCity: string
}

export default ChangeCityRequest;