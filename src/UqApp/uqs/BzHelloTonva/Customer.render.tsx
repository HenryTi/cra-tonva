import { Customer } from "./BzHelloTonva";

export function renderCustomer(item: Customer):JSX.Element {
	let {firstName, lastName, no} = item;
	return <span><b>{firstName} {lastName}</b> <small>{no}</small></span>;
}
