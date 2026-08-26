import { PERMISSION_KEY } from '../../consts';
import type { UserProfileDTO } from '../../generated';
import { SessionStorage } from '../storage/storage';

export const savePermissionDataToSession = (payload: UserProfileDTO) =>
	SessionStorage.write(PERMISSION_KEY, payload);
