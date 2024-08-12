import { SetMetadata } from '@nestjs/common';
import { PERMISSION } from 'constants/permission.constant';

export const Permission = (permission: string) =>
  SetMetadata(PERMISSION, permission);
