import {Request, Response, NextFunction } from "express";
const {validationResult} = require("express-validator");
import UserService from "../services/userService";
import UserRequest from "../types/requests/userRequest";
import UserResponse from "../types/responses/userResponse";

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();
      res.send(await userService.getAll());
    }
    catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = new UserService();

      const {userId} = req.params;
      res.send(await userService.getUser(Number(userId)));
    }
    catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return next(Error('invalid fields'))

      const userService = new UserService();

      // user
      const userRequest: UserRequest = req.body;
      const createdUser = await userService.addUser(userRequest);
      const {id, name, email} = createdUser;
      const userResponse: UserResponse = {id, name, email};

      // tokens
      const {accessToken, refreshToken} = {accessToken: "acc", refreshToken: "ref"};

      res.cookie('refreshToken', refreshToken, {
        maxAge: 14 * 24 * 60 * 60 * 1000, // 2 weeks
        httpOnly: true
      });

      return res.json({
        userResponse,
        accessToken
      })
    }
    catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {

  }

  async logout(req: Request, res: Response, next: NextFunction) {

  }

  async refresh(req: Request, res: Response, next: NextFunction) {

  }
}

export default UserController;