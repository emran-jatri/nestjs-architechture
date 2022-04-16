import { SetMetadata } from '@nestjs/common';

export const HAS_PERMISSION_KEY = 'hasPermission';
export const HasPermission = (permission: number) => SetMetadata(HAS_PERMISSION_KEY, permission);