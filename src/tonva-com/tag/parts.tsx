import { FA } from "tonva-react";

export function renderRight(onClick: () => void) {
	return <button className="btn btn-sm btn-primary mr-2" onClick={onClick}>
		<FA name="plus" />
	</button>;
}
