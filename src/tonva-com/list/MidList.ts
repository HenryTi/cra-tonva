//import { PageItems } from "tonva-react";
import { ListPageItems } from "../tools";
import { IDBase, Mid } from "../base";
import { PageItems } from "tonva-react";
//import { IDBase } from "../base";

export abstract class MidList<T> extends Mid {
	protected listPageItems: ListPageItems<T>;	
	abstract createPageItems():PageItems<T>;
	async init():Promise<void> {}
	protected abstract loadPageItems(pageStart:any, pageSize:number):Promise<T[]>;
	abstract key:((item:T) => number|string);
}

export abstract class MidIDListBase<T extends IDBase> extends MidList<T> {
	protected listPageItems: IDListPageItems<T>;
	key:((item:T) => number|string) = item => item.id;
	createPageItems():PageItems<T> {
		return this.listPageItems = new IDListPageItems<T>(
			(pageStart:any, pageSize:number) => this.loadPageItems(pageStart, pageSize)
		);
	}
}

class IDListPageItems<T extends IDBase> extends ListPageItems<T> {
	itemId(item:T):number {return item.id}
	newItem(id:number, item:T):T {return {...item, id}}

	update(id:number, item:T) {
		let ret = this._items.find(v => this.itemId(item) === id);
		if (ret === undefined) {
			let data = this.newItem(id, item);
			this._items.unshift(data);
		}
		else {
			Object.assign(ret, item);
		}
	}
}
