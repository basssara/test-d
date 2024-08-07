import { registerAs } from '@nestjs/config';

export declare interface AsbtConfig {
  url?: string;
  timeout?: number;
}

export const asbtConfig = registerAs<AsbtConfig>(
  'asbt',
  (): AsbtConfig => ({
    url: process.env.ASBT_SERVICE_URL,
    timeout: process.env.ASBT_SERVICE_TIMEOUT
      ? parseInt(process.env.ASBT_SERVICE_TIMEOUT, 10)
      : undefined,
  }),
);
