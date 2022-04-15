import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/common/enums/UserType';

export const ROLES_KEY = 'userType';
export const IsType = (userType: UserType) => SetMetadata(ROLES_KEY, userType);