import { registerAs } from '@nestjs/config';

export declare interface AsbtConfig {
  url?: string;
  timeout?: number;
  login?: string;
  password?: string;
  currentSystem?: number;
}

export const asbtConfig = registerAs<AsbtConfig>(
  'asbt',
  (): AsbtConfig => ({
    url: process.env.ASBT_SERVICE_URL,
    login: process.env.ASBT_SERVICE_LOGIN,
    password: process.env.ASBT_SERVICE_PASSWORD,
    currentSystem: parseInt(process.env.ASBT_SERVICE_CURRENT_SYSTEM, 10),
    timeout: process.env.ASBT_SERVICE_TIMEOUT
      ? parseInt(process.env.ASBT_SERVICE_TIMEOUT, 10)
      : undefined,
  }),
);
