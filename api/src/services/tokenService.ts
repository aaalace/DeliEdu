import prisma from "../db/prisma";
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } from "../constants/auth";
import { Tokens } from "../types/helpers/tokens";
import UserResponse from "../types/responses/userResponse"

class TokenService {
  createTokens(payload: UserResponse): Tokens {
    const accessToken = sign(payload, process.env.ACCESS_SECRET_KEY as string, {expiresIn: ACCESS_TOKEN_EXPIRES})
    const refreshToken = sign(payload, process.env.REFRESH_SECRET_KEY as string, {expiresIn: REFRESH_TOKEN_EXPIRES})

    return { accessToken, refreshToken }
  }

  verifyAccessToken(accessToken: string)  {
    try{
      const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY || 'access_not_so_secret_key';
      return verify(accessToken, ACCESS_SECRET_KEY) as JwtPayload & UserResponse;
    } catch (e) {
      return null
    }
  }

  verifyRefreshToken(refresh_token: string) {
    try{
      const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || 'refresh_not_so_secret_key';
      return verify(refresh_token, REFRESH_SECRET_KEY) as JwtPayload & UserResponse;
    } catch (e) {
      return null
    }
  }

  async updateRefreshToken(userId: number, newRefreshToken: string) {
    const relation: any = await prisma.refreshToken.findUnique({where: {userId: userId}})
    if (relation) {
      await prisma.refreshToken.update({
        where: { userId },
        data: {
          token: newRefreshToken
        },
      });
    } else {
      await prisma.refreshToken.create({
        data: {
          userId: userId,
          token: newRefreshToken
        }
      })
    }
  }
}

export default TokenService