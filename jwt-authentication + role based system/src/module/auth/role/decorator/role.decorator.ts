import { SetMetadata } from '@nestjs/common';

export const Permission = (permission: string) => SetMetadata('permission', permission);

export const ExtraPermission = (permissions: string[]) => SetMetadata('extraPermissions', permissions);

export const TEMPORARY_PERMISSION_KEY = 'temporaryPermission';
export const TemporaryPermission = (permissions: string[]) => SetMetadata(TEMPORARY_PERMISSION_KEY, permissions);

export const SkipPermissions = () => SetMetadata('skipPermissions', true);