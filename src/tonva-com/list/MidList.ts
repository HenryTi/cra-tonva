import { PageItems } from "tonva-react";
import { ListPageItems } from "../tools";
import { Mid } from "../base";
import { IDBase } from "../base";

export abstract class MidList<T extends IDBase> extends Mid {
	protected pageItems: PageItems<T>;
	createPageItems():PageItems<T> {
		return this.pageItems = new ListPageItems<T>((pageStart:any, pageSize:number) => this.loadPageItems(pageStart, pageSize));
	}

	async init():Promise<void> {}
	protected abstract loadPageItems(pageStart:any, pageSize:number):Promise<T[]>;
	key:((item:T) => number|string) = item => item.id;
}
