import { runInAction } from "mobx";
import { ID, IX, Uq } from "tonva-react";
import { CList, MidList } from "../list";
import { IXBase, IDBase } from "../base";
import { listRight, renderItem } from "../tools";
import { CTagList, TagListProps } from "./CTagList";
import { CSelect } from "./select";
import { MidTag } from "./Mid";

export interface IDTagListProps<T extends IDBase> {
	midTag: MidTag;
	onRightClick: ()=>any;
	renderItem: (item:T, index:number)=>JSX.Element;
	//onItemClick: (item:T)=>any;
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
		let {midTag} = this.props;
		let {uq, ID, IX, tag} = midTag;
		return this.midIXList = new MidIDTagList<T2>(uq, ID, IX, tag);
	}
	protected onItemClick(item:any):void {
		let {midTag} = this.props;
		let cSelect = new CSelect(item, midTag, this.res);
		cSelect.start();
	}

	protected renderRight():JSX.Element {
		let {onRightClick, renderRight} = this.props;
		if (!onRightClick) return null;
		return (renderRight ?? listRight)(onRightClick);
	}

	protected renderItem(item:any, index:number):JSX.Element {
		let {midTag, renderItem} = this.props;
		let {ID} = midTag;
		return (renderItem ??  ID.render)(item, index);
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

	protected async loadPageItems(pageStart:any, pageSize:number):Promise<T[]> {
		let result = await this.uq.IDxID<T, any>({
			ID: this.ID,
			IX: this.IX,
			ID2: this.ID2,
			page: {start:pageStart, size:pageSize},
		});
		let [ret, ret2] = result;
		let coll:{[id:number]:T} = {}
		for (let item of ret) {
			coll[item.id] = item;
			(item as any)['$tags'] = [];
		}
		for (let tagItem of ret2) {
			let item = coll[tagItem.id];
			((item as any)['$tags'] as any[]).push(tagItem);
		}
		return ret;
	}

	update(item:T) {
		runInAction(() => {
			let {_items} = this.listPageItems;
			if (!_items) return;
			let {id, id2} = item;
			if (id < 0) {
				let index = _items.findIndex(v => v.id === -id && v.id2 === id2);
				if (index >= 0) _items.splice(index, 1);
			}
			else {
				let ret = _items.find(v => v.id === id && v.id2 === id2);
				if (!ret) {
					_items.unshift({id, id2} as T);
				}
			}
		});
	}
}
