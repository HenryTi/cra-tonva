import { runInAction } from "mobx";
import { ID, IX, Uq } from "tonva-react";
import { CList, MidList } from "../list";
import { IXBase, IDBase } from "../base";
import { listRight, renderItem } from "../tools";

export interface IDTagListProps<T extends IDBase> {
	uq: Uq;
	ID: ID;
	IX: IX;
	tag: ID;
	id: number;
	onRightClick: ()=>any;
	renderItem: (item:T, index:number)=>JSX.Element;
	onItemClick: (item:T)=>any;
	renderRight?: ()=>JSX.Element;
}

export class CIDTagList<T extends IDBase, T2 extends IXBase> extends CList<T> {
	private props: IDTagListProps<T>;
	protected midIXList: MidIDTagList<T2>;
	constructor(props: IDTagListProps<T>) {
		super(undefined);
		this.props = props;
	}

	protected createMidList(): MidList<T2> {
		let {uq, ID, IX, tag} = this.props;
		return this.midIXList = new MidIDTagList<T2>(uq, ID, IX, tag);
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

class MidIDTagList<T extends IXBase> extends MidList<T> {
	readonly ID:ID;
	readonly IX:IX;
	readonly ID2: ID;
	constructor(uq:Uq, ID:ID, IX:IX, ID2:ID) {
		super(uq);
		this.ID = ID;
		this.IX = IX;
		this.ID2 = ID2;
	}

	async init() {
		await this.IX.loadSchema();
	}

	key:((item:T) => number|string) = item => item.ix;

	protected async loadPageItems(pageStart:any, pageSize:number):Promise<T[]> {
		let result = await this.uq.IDxID<T, any>({
			ID: this.ID,
			IX: this.IX,
			ID2: this.ID2,
			page: {start:pageStart, size:pageSize+1},
		});
		let [ret, ret2] = result;
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
