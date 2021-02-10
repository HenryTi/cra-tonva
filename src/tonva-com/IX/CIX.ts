import { Controller, ID, IX, Uq } from "tonva-react";
import { CIXList } from "./CIXList";

export interface IXProps {
	uq: Uq;
	IX: IX;
	ID?: ID;
	id: number;
}

export class CIX<P extends IXProps> extends Controller {
	protected readonly props: P;

	constructor(props: P, res?:any) {
		super(res);
		this.props = props;
	}

	protected async internalStart() {
		let {uq, IX, ID, id} = this.props;
		let idList = new CIXList({
			uq,
			IX,
			ID,
			id,
			onRightClick: this.onItemEdit,
			renderItem: undefined,
			onItemClick: this.onItemClick,
			renderRight: undefined,
		});
		await idList.start();
	}

	private onItemEdit = () => {

	}

	private onItemClick = (item:any) => {
		
	}
}
