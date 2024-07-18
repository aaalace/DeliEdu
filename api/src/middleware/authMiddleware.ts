import TokenService from "../services/tokenService";
import { NextFunction, Request, Response } from "express";
import { ControlError } from "./errorHandlerMiddleware";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenService = new TokenService();

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return next(new ControlError('unauthorized'));
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) return next(new ControlError('unauthorized'));

    const localUserData = tokenService.verifyAccessToken(accessToken)
    if (!localUserData) {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return next(new ControlError('unauthorized'));

      const localUserData = tokenService.verifyRefreshToken(refreshToken);
      if (!localUserData) return next(new ControlError('unauthorized'));

      const { ...userFromToken } = localUserData;
      req.body.userFromToken = userFromToken;
      next()
      return;
    }

    const { ...userFromToken } = localUserData;
    req.body.userFromToken = userFromToken;
    next();
  } catch (e) {
    return next(new ControlError('unauthorized'));
  }
}

export default authMiddleware;