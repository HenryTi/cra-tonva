import { Tag } from "./BzHelloTonva";

export function renderTag(item: Tag):JSX.Element {
	return <>{JSON.stringify(item)}</>;
}
