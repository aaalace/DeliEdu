import prisma from "../db/prisma";
import AddUserRequest from "../types/requests/addUserRequest";
import bcrypt from "bcrypt";
import User from "../types/entitites/user";
import LoginUserRequest from "../types/requests/loginUserRequest";
import TokenService from "./tokenService";
import { Tokens } from "../types/entitites/tokens";
import { JwtPayload } from "../types/entitites/jwtPayload";

class UserService {
  async getAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async getUser(userId: number): Promise<User> {
    const user: any = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw Error('user not found');

    return user;
  }

  async addUser(addUserRequest: AddUserRequest): Promise<User> {
    const user: any = await prisma.user.findFirst({ where: { email: addUserRequest.email } });
    if (user) throw Error('user is already exists');

    const hash: string = await bcrypt.hash(addUserRequest.password, 3);
    const newUser: any = await prisma.user.create({
      data: {
        name: addUserRequest.name,
        email: addUserRequest.email,
        password: hash.toString()
      }
    });
    if (!newUser) throw Error('error in creating user instance');

    return newUser;
  }

  async login(loginUserRequest: LoginUserRequest): Promise<User> {
    const user: any = await prisma.user.findFirst({ where: { email: loginUserRequest.email } });
    if (!user) throw Error('wrong email or password');

    const isEqual: boolean = await bcrypt.compare(loginUserRequest.password, user.password);
    if(!isEqual) throw Error('wrong email or password');

    return user;
  }

  async refresh(oldRefreshToken: string) {
    const tokenService = new TokenService();
    const localUserData: JwtPayload | null = tokenService.verifyRefreshToken(oldRefreshToken);
    if (!localUserData) throw Error('unauthorized');

    const tokens: Tokens = tokenService.createTokens({
      id: localUserData.id,
      email: localUserData.email,
      name: localUserData.name,
    });
    await tokenService.updateRefreshToken(localUserData.id, tokens.refreshToken);

    return {
      tokens,
      user: localUserData
    }
  }
}

export default UserService;