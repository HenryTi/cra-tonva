import { FormUI, Uq } from "tonva-react";
import { Detail, Master, Mid } from "../base";

export interface SheetOptions {
	master: FormUI;
	detail: FormUI;
}

export class MidSheet<M extends Master, D extends Detail> extends Mid {
	readonly master: FormUI;
	readonly detail: FormUI;

	constructor(uq:Uq, res:any, options: SheetOptions) {
		super(uq, res);
		let {master, detail} = options;
		this.master = master;
		this.detail = detail;
	}

	async load(id:number):Promise<[M[],D[]]> {
		return [[], []];
	}

	async save(master:M, details:D[]):Promise<any> {
		let ret = await this.uq.IDDetail({
			master: {
				ID: this.master.ID,
				value: master,
			},
			detail: {
				ID: this.detail.ID,
				values: details,
			},
		});
		return ret;
	}
};
