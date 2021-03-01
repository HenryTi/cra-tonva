import { CList } from "../list";
import { IDBase } from "../base";
import { MidIDList } from "./MidIDList";

/*
export interface IDListProps<T extends IDBase> {
	uq: Uq;
	ID: ID;
	onRightClick?: ()=>any;
	renderItem: (item:T, index:number)=>JSX.Element;
	onItemClick: (item:T)=>any;
	renderRight?: ()=>JSX.Element;
}
*/
export class CIDList<T extends IDBase> extends CList<T> {
	//protected props: IDListProps<T>;
	protected readonly midIDList: MidIDList<T>;
	constructor(midIDList: MidIDList<T>) {
		super(midIDList);
		this.midIDList = midIDList;
	}

	protected renderItem(item:any, index:number):JSX.Element {
		let {ID } = this.midIDList;
		if (ID) return ID.render(item);
		return super.renderItem(item, index);
	}

	update(id:number, item:any) {
		this.midIDList.update(id, item);
	}
}
