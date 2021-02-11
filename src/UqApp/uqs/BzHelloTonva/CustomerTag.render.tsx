import { CustomerTag } from "./BzHelloTonva";

export function renderCustomerTag(item: CustomerTag):JSX.Element {
	return <>{JSON.stringify(item)}</>;
}
