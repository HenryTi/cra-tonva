import { ID, IX, Uq } from "tonva-react";
import { IXBase } from "../base";
import { MidList } from "../list";
import { CSelect, SelectProps, MidSelectList } from "./CSelect";

export interface IXSelectProps<T extends IXBase> extends SelectProps<T> {
	IX: IX;
	id: number;
}

export class CIXSelect<T extends IXBase> extends CSelect<T, IXSelectProps<T>> {
	protected createMidList(): MidList<T> {
		let {uq, ID, IX, id} = this.props;
		return new MidIXSelectList(uq, ID, IX, id);
	}
}

class MidIXSelectList<T extends IXBase> extends MidSelectList<T> {
	readonly IX:IX;
	readonly id:number;
	constructor(uq:Uq, ID:ID, IX:IX, id:number) {
		super(uq, ID);
		this.IX = IX;
		this.id = id;
	}

	async init() {
		await super.init();
		await this.IX.loadSchema();
	}

	protected async loadPageItems(pageStart:any, pageSize:number):Promise<T[]> {
		let ret = await this.uq.IDinIX<T>({
			ID: this.ID,
			IX: this.IX,
			id: this.id,
			page: {start:pageStart, size:pageSize+1},
		});
		return ret as any[];
	}
}
