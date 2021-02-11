import { Customer } from "./BzHelloTonva";

export function renderCustomer(item: Customer):JSX.Element {
	return <>客户：{JSON.stringify(item)}</>;
}
