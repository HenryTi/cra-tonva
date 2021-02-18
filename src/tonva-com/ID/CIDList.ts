import { ID, Uq } from "tonva-react";
import { CList, MidList } from "../list";
import { listRight  } from '../tools';
import { IDBase } from "../base";
import { MidIDList } from "./MidIDList";

export interface IDListProps<T extends IDBase> {
	uq: Uq;
	ID: ID;
	onRightClick?: ()=>any;
	renderItem: (item:T, index:number)=>JSX.Element;
	onItemClick: (item:T)=>any;
	renderRight?: ()=>JSX.Element;
}

export class CIDList<T extends IDBase> extends CList<T> {
	protected props: IDListProps<T>;
	protected midIDList: MidIDList<T>;
	constructor(props: IDListProps<T>) {
		super(undefined);
		this.props = props;
	}

	protected createMidList(): MidList<T> {
		return this.midIDList = new MidIDList(this.props.uq, this.props.ID);
	}
	protected onItemClick(item:any):void {
		this.props.onItemClick(item);
	}

	protected renderRight():JSX.Element {
		return (this.props.renderRight ?? listRight)(this.props.onRightClick);
	}

	protected renderItem(item:any, index:number):JSX.Element {
		let {renderItem, ID } = this.props;
		return (renderItem ?? ID.render)(item, index);
	}

	update(id:number, item:any) {
		this.midIDList.update(id, item);
	}
}
