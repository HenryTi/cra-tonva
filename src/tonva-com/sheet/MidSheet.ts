import { Uq } from "tonva-react";
import { Detail, IDs, Master, Mid } from "../base";

export interface SheetOptions {
	master: IDs;
	detail: IDs;
}

export class MidSheet<M extends Master, D extends Detail> extends Mid {
	readonly MasterIDs: IDs;
	readonly DetailIDs: IDs;

	constructor(uq:Uq, res:any, options: SheetOptions) {
		super(uq, res);
		let {master, detail} = options;
		this.MasterIDs = master;
		this.DetailIDs = detail;
	}

	async load(id:number):Promise<[M[],D[]]> {
		return [[], []];
	}
};
