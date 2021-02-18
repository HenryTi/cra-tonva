import { IDBase } from "tonva-com/base";
import { MidIDListBase } from "tonva-com/list";
import { ID, Uq } from "tonva-react";

export class MidIDList<T extends IDBase> extends MidIDListBase<T> {
	readonly ID:ID;
	constructor(uq:Uq, ID:ID) {
		super(uq);
		this.ID = ID;
	}

	async init() {
		//await this.ID.loadSchema();
	}

	protected async loadPageItems(pageStart:any, pageSize:number):Promise<T[]> {
		let ret = await this.uq.ID<T>({
			IDX: this.ID,
			id: undefined,
			page: {start:pageStart, size:pageSize},
		});
		return ret;
	}

	update(id:number, item:any) {
		this.listPageItems.update(id, item);
	}
}
