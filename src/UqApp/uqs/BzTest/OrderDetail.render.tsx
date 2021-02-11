import { OrderDetail } from "./BzTest";

export function renderOrderDetail(item: OrderDetail):JSX.Element {
	return <>{JSON.stringify(item)}</>;
}
