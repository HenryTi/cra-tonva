import { OrderDetail } from "./BzHelloTonva";

export function renderOrderDetail(item: OrderDetail):JSX.Element {
	return <>{JSON.stringify(item)}</>;
}
