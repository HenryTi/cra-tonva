import { ID, IDX, Uq } from "tonva-react";
import { CList, MidIDListBase, MidList } from "../list";
import { listRight  } from '../tools';
import { IDBase } from "../base";

export interface IDXListProps<T extends IDBase> {
	uq: Uq;
	IDX: IDX;
	ID: ID;
	onRightClick: ()=>any;
	renderItem: (item:T, index:number)=>JSX.Element;
	onItemClick: (item:T)=>any;
	renderRight?: ()=>JSX.Element;
}

export class CIDXList<T extends IDBase> extends CList<T> {
	private props: IDXListProps<T>;
	constructor(props: IDXListProps<T>) {
		super(undefined);
		this.props = props;
	}

	protected createMidList(): MidList<T> {
		return new MidIDXList(this.props.uq, this.props.ID);
	}
	protected onItemClick(item:any):void {
		this.props.onItemClick(item);
	}

	protected renderRight():JSX.Element {
		return (this.props.renderRight ?? listRight)(this.props.onRightClick);
	}

	protected renderItem(item:any, index:number):JSX.Element {
		let {renderItem, ID} = this.props;
		return (renderItem ?? ID.render)(item, index);
	}
}

class MidIDXList<T extends IDBase> extends MidIDListBase<T> {
	readonly ID:ID;
	constructor(uq:Uq, ID:ID) {
		super(uq);
		this.ID = ID;
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
