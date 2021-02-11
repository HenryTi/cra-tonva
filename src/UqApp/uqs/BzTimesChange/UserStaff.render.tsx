import { UserStaff } from "./BzTimesChange";

export function renderUserStaff(item: UserStaff):JSX.Element {
	return <>{JSON.stringify(item)}</>;
}
