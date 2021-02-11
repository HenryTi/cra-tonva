import { Tag } from "./BzTest";

export function renderTag(item: Tag):JSX.Element {
	return <>{JSON.stringify(item)}</>;
}
