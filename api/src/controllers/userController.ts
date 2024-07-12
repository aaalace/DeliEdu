import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import UserService from "../services/userService";
import AddUserRequest from "../types/requests/addUserRequest";
import UserResponse from "../types/responses/userResponse";
import { toUserResponse } from "../lib/toUserResponse";
import User from "../types/entitites/user";
import LoginUserRequest from "../types/requests/loginUserRequest";
import { toUsersResponse } from "../lib/toUsersResponse";
import { REFRESH_TOKEN, REFRESH_TOKEN_LIFETIME } from "../constants/auth";
import TokenService from "../services/tokenService";
import { Tokens } from "../types/entitites/tokens";
import { JwtPayload } from "../types/entitites/jwtPayload";

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();
      const users: User[] = await userService.getAll();

      return res.json(toUsersResponse(users));
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();

      const { userId } = req.params;
      const user: User = await userService.getUser(Number(userId));


      return res.json(toUserResponse(user));
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next(Error(JSON.stringify(errors.mapped())));

      // user
      const userService = new UserService();
      const addUserRequest: AddUserRequest = req.body;
      const user: User = await userService.addUser(addUserRequest);
      const userResponse: UserResponse = toUserResponse(user);

      // tokens
      const tokenService = new TokenService();
      const userPayload: JwtPayload = {
        id: userResponse.id,
        name: userResponse.name,
        email: userResponse.email,
      };
      const tokens: Tokens = tokenService.createTokens(userPayload);
      await tokenService.updateRefreshToken(userResponse.id, tokens.refreshToken);
      res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
        maxAge: REFRESH_TOKEN_LIFETIME, // 2 weeks
        httpOnly: true
      });

      return res.json({
        user: userResponse,
        accessToken: tokens.accessToken
      })
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next(Error(JSON.stringify(errors.mapped())));

      // user
      const userService = new UserService();
      const loginUserRequest: LoginUserRequest = req.body;
      const user: User = await userService.login(loginUserRequest);
      const userResponse: UserResponse = toUserResponse(user);

      // tokens
      const tokenService = new TokenService();
      const userPayload: JwtPayload = {
        id: userResponse.id,
        name: userResponse.name,
        email: userResponse.email,
      };
      const tokens: Tokens = tokenService.createTokens(userPayload);
      await tokenService.updateRefreshToken(userResponse.id, tokens.refreshToken);
      res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
        maxAge: REFRESH_TOKEN_LIFETIME, // 2 weeks
        httpOnly: true
      });

      return res.json({
        user: userResponse,
        accessToken: tokens.accessToken
      })
    } catch (e) {
      next(e)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try{
      res.clearCookie(REFRESH_TOKEN);
      return res.status(200).end();
    }
    catch (e) {
      next(e)
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();

      const {refreshToken: oldRefreshToken} = req.cookies;
      const {tokens, user} = await userService.refresh(oldRefreshToken);
      res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
        maxAge: REFRESH_TOKEN_LIFETIME, // 2 weeks
        httpOnly: true,
      })

      return res.json({
        user,
        accessToken: tokens.accessToken
      })
    } catch (error) {
      next(error)
    }
  }
}

export default UserController;