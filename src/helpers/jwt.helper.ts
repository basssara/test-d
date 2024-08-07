import type { JwtModel } from '@interfaces';
import { sign, verify } from 'jsonwebtoken';

export const verifyJwt = (token: string, secret: string): JwtModel | null => {
  const decoded: any = verify(token, secret);

  console.log('verifyJwt', decoded);

  if (!decoded) {
    return null;
  }

  return decoded.data as JwtModel;
};

export const signJwt = (
  payload: JwtModel,
  secret: string,
  exp: number,
): string => sign({ data: payload }, secret, { expiresIn: exp });
