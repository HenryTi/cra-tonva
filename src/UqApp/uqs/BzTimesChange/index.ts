import { UqExt as Uq } from './BzTimesChange';
import * as Staff from './Staff.ui';
import * as Hours from './Hours.ui';
import * as UserStaff from './UserStaff.ui';

export function setUI(uq: Uq) {
	Object.assign(uq.Staff, Staff);
	Object.assign(uq.Hours, Hours);
	Object.assign(uq.UserStaff, UserStaff);
}
export * from './BzTimesChange';
