import { CustomerTag } from "./BzTest";

export function renderCustomerTag(item: CustomerTag):JSX.Element {
	return <>{JSON.stringify(item)}</>;
}
