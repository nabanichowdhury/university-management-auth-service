import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';

const auth =
  (...requiredRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Not Authorized');
      }

      const verifiedUser = jwt.verify(
        token,
        config.jwt.secret as Secret
      ) as JwtPayload;

      req.user = verifiedUser;

      if (requiredRole.length && !requiredRole.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid role Accessed');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
