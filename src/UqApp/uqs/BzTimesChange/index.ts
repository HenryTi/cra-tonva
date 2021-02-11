import { UqExt as Uq } from './BzTimesChange';
import { renderStaff } from './Staff.render';
import { renderHours } from './Hours.render';
import { renderUserStaff } from './UserStaff.render';

export function setRenders(uq: Uq) {
	uq.Staff.setRender(renderStaff);
	uq.Hours.setRender(renderHours);
	uq.UserStaff.setRender(renderUserStaff);
}
export * from './BzTimesChange';
