import crypto from 'crypto';
import { generateSalt } from './generate-salt.helper';

export const hashPassword = async (
  password: string,
): Promise<{ hash: string; salt: string }> => {
  const salt = Buffer.from(generateSalt(), 'base64');

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      27500,
      32,
      'sha256',
      (err: unknown, derivedKey: Buffer) => {
        if (err) return reject(err);
        return resolve({
          hash: derivedKey.toString('base64'),
          salt: salt.toString('base64'),
        });
      },
    );
  });
};

export const comparePassword = async (
  password: string,
  salt: string,
  hash: string,
): Promise<boolean> => {
  const saltToBuff = Buffer.from(salt, 'base64');

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      saltToBuff,
      27500,
      32,
      'sha256',
      (err: unknown, derivedKey: Buffer) => {
        if (err) return reject(err);
        return resolve(hash === derivedKey.toString('base64'));
      },
    );
  });
};
