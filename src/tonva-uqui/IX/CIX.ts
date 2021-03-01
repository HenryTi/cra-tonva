import { Mid } from "tonva-uqui/base";
import { Controller, ID, IX, Uq } from "tonva-react";
import { CIXList, MidIXList } from "./CIXList";

export class MidIX extends Mid {
	//readonly uq: Uq;
	readonly IX: IX;
	readonly ID: ID;
	readonly id: number;
	constructor(uq:Uq, IX:IX, ID:ID, id:number, res?:any) {
		super(uq, res);
		this.IX = IX;
		this.ID = ID;
		this.id = id;
	}
}

export class CIX<P extends MidIX> extends Controller {
	protected readonly mid: P;

	constructor(mid: P) {
		super(mid.res);
		this.mid = mid;
	}

	protected async internalStart() {
		let {uq, IX, ID, id} = this.mid;
		let midIXList = new MidIXList(uq, IX, ID, id);
		midIXList.onRightClick = this.onItemEdit;
		midIXList.renderItem = undefined;
		midIXList.onItemClick = this.onItemClick;
		midIXList.renderRight = undefined;
		let idList = new CIXList(midIXList);
		await idList.start();
	}

	private onItemEdit = () => {

	}

	private onItemClick = (item:any) => {
		
	}
}
