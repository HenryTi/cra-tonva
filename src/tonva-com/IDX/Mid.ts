import { ID, Schema, UiSchema, Uq, Prop, IDX } from "tonva-react";
import { buildGridProps, TimeSpan } from "../tools";
import { Mid } from "../base";

export class MidIDX extends Mid {
	readonly IDX: IDX;
	readonly ID: ID;
	constructor(uq: Uq, IDX: IDX, ID: ID) {
		super(uq);
		this.IDX = IDX;
		this.ID = ID;
	}

	async loadSchema() {
		await Promise.all([
			this.IDX.loadSchema(),
			this.ID.loadSchema(),
		]);
	}

	async load(id:number): Promise<any[]> {
		let ret = await this.uq.ID({
			IDX: [this.ID, this.IDX],
			id,
			page: undefined,
		});
		return ret;
	}

	/*
	comPageItems = async (start:number, size:number):Promise<any[]> => {
		let ret = await this.uq.ID({
			IDX: [this.ID, this.IDX],
			id: undefined,
			page: {start, size:size+1},
		});
		return ret;
	}
	*/
	historyPageItems = async (id:number, field:string, far:number, near:number, pageStart:any, pageSize:number):Promise<any[]> => {
		let ret = await this.uq.IDLog({
			IDX: this.IDX,
			field,
			id,
			log: 'each',
			far,
			near,
			page: {
				start: pageStart,
				size: pageSize,
			}
		});
		return ret;
	}

	async saveID(data:any):Promise<number> {
		let param: any = {};
		param[this.ID.name] = [data];
		let ret = await this.uq.IDActs(param);
		let id = ret[this.ID.name];
		return id[0];
	}

	async saveFieldValue(id:number, fieldName:string, t:any, value:string|number):Promise<void> {
		let param: any = {};
		let val: any = {id};
		val[fieldName] = {
			$time: t,
			value,
		}
		param[this.IDX.name] = [val];
		let ret = await this.uq.IDActs(param);
		return ret;
	}

	async loadFieldSum(id:number, field:string, timeSpan:TimeSpan):Promise<any> {
		let {far, near} = timeSpan;
		let retSum = await this.uq.IDSum({
			IDX: this.IDX,
			field: [field],
			id,
			far,
			near,
		});
		let ret = retSum[0];
		return ret;
	}

	async loadSum(id:number, far:number, near:number):Promise<[any[], any[]]> {
		let valueFields:string[] = [];
		let {fields, exFields} = this.IDX.schema;
		if (exFields === undefined) {
			throw new Error('no valid sum field in exFields');
		}
		for (let ex of exFields) {
			let {field, log} =  ex;
			if (log !== true) continue;
			let f = (fields as any[]).find(v => v.name === field);
			if (f === undefined) continue;
			let {name, type} = f;
			if (['int', 'tinyint', 'smallint', 'bigint', 'dec'].indexOf(type) < 0) continue;
			valueFields.push(name);
		}
		return await Promise.all([
			this.uq.ID({
				IDX: this.IDX,
				id,
			}),
			this.uq.IDSum({
				IDX: this.IDX,
				field: valueFields,
				id,
				far,
				near,
			}),
		]);
	}

	private _itemSchema: Schema;
	get itemSchema(): Schema {
		if (this._itemSchema !== undefined) return this._itemSchema;
		return this._itemSchema = this.buildItemSchema(this.ID);
	}
	/*
	protected buildItemSchema(): Schema {
		let ret:Schema = [];
		let {schema} = this.ID;
		let {keys, fields} = schema;
		for (let f of fields) {
			let {name, type} = f;
			let required = (keys as any[]).findIndex(v => v.name === name) >= 0;
			switch (type) {
				default: throw new Error(`schema type ${type} not implemented`);
				case 'id':
					break;
				case 'char':
					ret.push({
						name,
						type: 'string',
						required,
						maxLength: f.size,
					} as StringSchema);
					break;
				case 'number':
					ret.push({
						name,
						type: 'number',
						required,
					} as NumSchema);
					break;
			}
		}
		ret.push({
			name: 'submit',
			type: 'submit',
		} as ButtonSchema);
		return ret;
	}
	*/
	private _uiSchema: UiSchema;
	get uiSchema(): UiSchema {
		if (this._uiSchema !== undefined) return this._uiSchema;
		return this._uiSchema = this.buildUISchema(this.ID);
	}

	/*
	protected buildUISchema():UiSchema {
		return;
	}
	*/

	private _props: Prop[];
	get props():Prop[] {
		if (this._props !== undefined) return this._props;
		return this._props = buildGridProps(this.IDX.ui);
	}
}
