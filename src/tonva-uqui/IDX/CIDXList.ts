import { ID, IDX, Uq } from "tonva-react";
import { CList, MidIDListBase } from "../list";
import { IDBase } from "../base";

/*
export interface IDXListProps<T extends IDBase> {
	uq: Uq;
	IDX: IDX;
	ID: ID;
	onRightClick: ()=>any;
	renderItem: (item:T, index:number)=>JSX.Element;
	onItemClick: (item:T)=>any;
	renderRight?: ()=>JSX.Element;
}
*/
export class CIDXList<T extends IDBase> extends CList<T> {
	private midIDList: MidIDXList<T>;
	constructor(midIDList: MidIDXList<T>) {
		super(midIDList);
		this.midIDList = midIDList;
	}

	protected renderItem(item:any, index:number):JSX.Element {
		let {ID} = this.midIDList;
		if (ID) return ID.render(item);
		return super.renderItem(item, index);
	}
}

export class MidIDXList<T extends IDBase> extends MidIDListBase<T> {
	readonly ID:ID;
	readonly IDX: IDX;
	constructor(uq:Uq, ID:ID, IDX:IDX) {
		super(uq);
		this.ID = ID;
		this.IDX = IDX;
	}

	async init() {
		await this.ID.loadSchema();
	}

	protected async loadPageItems(pageStart:any, pageSize:number):Promise<T[]> {
		let ret = await this.uq.ID<T>({
			IDX: this.ID,
			id: undefined,
			page: {start:pageStart, size:pageSize},
		});
		return ret;
	}
}
