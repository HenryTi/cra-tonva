import { PageItems } from "tonva-react";
import { IDBase } from "../base";

export type IDItemsPageLoader<T> = (pageStart:any, pageSize:number) => Promise<T[]>;
export type HistoryPageLoader<T> = (id:number, field:string, far:number, near:number, pageStart:any, pageSize:number) => Promise<T[]>;

export class ListPageItems<T extends IDBase> extends PageItems<T> {
	private comPage: IDItemsPageLoader<T>;
	constructor(comPage: IDItemsPageLoader<T>) {
		super(true);
		this.comPage = comPage;
	}

	async loadResults(param:any, pageStart:any, pageSize:number): Promise<{[name:string]:any[]}> {
		let ret = await this.comPage(pageStart, pageSize);
		return {$page:ret};
	}

	update(id:number, item:any) {
		let ret = this._items.find(v => v.id === id);
		if (ret === undefined) {
			let data = { ...item, id };
			this._items.unshift(data);
		}
		else {
			Object.assign(ret, item);
		}
	}
}

export class HistoryPageItems<T extends IDBase> extends PageItems<T> {
	private comPage: HistoryPageLoader<T>;
	constructor(comPage: HistoryPageLoader<T>) {
		super(true);
		this.comPage = comPage;
	}

	async loadResults(param:any, pageStart:any, pageSize:number): Promise<{[name:string]:any[]}> {
		let {id, field, far, near} = param;
		let ret = await this.comPage(id, field, far, near, pageStart, pageSize);
		return {$page:ret};
	}
}
