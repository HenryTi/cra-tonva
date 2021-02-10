import { ID, IX, IDX, Uq } from "tonva-react";
import { CList, MidList } from "../list";
//import { listRight  } from './parts';
import { IXBase, IDBase } from "../base";
import { listRight, renderItem } from "../tools/parts";
import { runInAction } from "mobx";

export interface IXListProps<T extends IDBase> {
	uq: Uq;
	IX: IX;
	ID: ID;
	id: number;
	onRightClick: ()=>any;
	renderItem: (item:T, index:number)=>JSX.Element;
	onItemClick: (item:T)=>any;
	renderRight?: ()=>JSX.Element;
}

export class CIXList<T extends IDBase, T2 extends IXBase> extends CList<T> {
	private props: IXListProps<T>;
	protected midIXList: MidIXList<T2>;
	constructor(props: IXListProps<T>) {
		super(undefined);
		this.props = props;
	}

	protected createMidList(): MidList<T2> {
		let {uq, IX, ID, id} = this.props;
		return this.midIXList = new MidIXList<T2>(uq, IX, ID, id);
	}
	protected onItemClick(item:any):void {
		this.props.onItemClick?.(item);
	}

	protected renderRight():JSX.Element {
		let {onRightClick, renderRight} = this.props;
		if (!onRightClick) return null;
		return (renderRight ?? listRight)(onRightClick);
	}

	protected renderItem(item:any, index:number):JSX.Element {
		return (this.props.renderItem ??  renderItem)(item, index);
	}

	update(item:any) {
		this.midIXList.update(item);
	}
}

class MidIXList<T extends IXBase> extends MidList<T> {
	readonly IX:IX;
	readonly ID:ID;
	readonly id: number;
	constructor(uq:Uq, IX:IX, ID:ID, id:number) {
		super(uq);
		this.IX = IX;
		this.ID = ID;
		this.id = id;
	}

	async init() {
		await this.IX.loadSchema();
	}

	key:((item:T) => number|string) = item => item.ix;

	protected async loadPageItems(pageStart:any, pageSize:number):Promise<T[]> {
		let ret = await this.uq.IX<T>({
			IX: this.IX,
			IDX: this.ID? [this.ID] : undefined,
			id: this.id,
			page: {start:pageStart, size:pageSize+1},
		});
		return ret;
	}

	update(item:T) {
		runInAction(() => {
			let {_items} = this.pageItems;
			if (!_items) return;
			let {id, ix} = item;
			if (id < 0) {
				let index = _items.findIndex(v => v.id === -id && v.ix === ix);
				if (index >= 0) _items.splice(index, 1);
			}
			else {
				let ret = _items.find(v => v.id === id && v.ix === ix);
				if (!ret) {
					_items.unshift({id, ix} as T);
				}
			}
		});
	}
}