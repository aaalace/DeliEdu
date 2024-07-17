import TokenService from "../services/tokenService";
import { NextFunction, Request, Response } from "express";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenService = new TokenService();

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return next(Error('unauthorized'));
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) return next(Error('unauthorized'));

    const localUserData = tokenService.verifyAccessToken(accessToken)
    if (!localUserData) {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return next(Error('unauthorized'));

      const localUserData = tokenService.verifyRefreshToken(refreshToken);
      if (!localUserData) return next(Error('unauthorized'));

      const { ...userFromToken } = localUserData;
      req.body.userFromToken = userFromToken;
      next()
    }

    const { ...userFromToken } = localUserData;
    req.body.userFromToken = userFromToken;
    next();
  } catch (e) {
    return next(Error('unauthorized'));
  }
}

export default authMiddleware;