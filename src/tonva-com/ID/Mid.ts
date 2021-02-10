import { ID, Schema, UiSchema, Uq, StringSchema, NumSchema, ButtonSchema, Prop } from "tonva-react";
import { buildGridProps } from "../tools";
import { Mid } from "../base";

export class MidID extends Mid {
	readonly ID: ID;
	constructor(uq: Uq, ID: ID) {
		super(uq);
		this.ID = ID;
	}

	async loadSchema() {
		await this.ID.loadSchema();
	}

	async load(id:number): Promise<any[]> {
		let ret = await this.uq.ID({
			IDX: this.ID,
			id,
			page: undefined,
		});
		return ret;
	}

	comPageItems = async (start:number, size:number):Promise<any[]> => {
		let ret = await this.uq.ID({
			IDX: this.ID,
			id: undefined,
			page: {start, size:size+1},
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

	private _itemSchema: Schema;
	get itemSchema(): Schema {
		if (this._itemSchema !== undefined) return this._itemSchema;
		return this._itemSchema = this.buildItemSchema();
	}

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

	private _uiSchema: UiSchema;
	get uiSchema(): UiSchema {
		if (this._uiSchema !== undefined) return this._uiSchema;
		return this._uiSchema = this.buildUISchema();
	}

	protected buildUISchema():UiSchema {
		return;
	}

	private _props: Prop[];
	get props():Prop[] {
		if (this._props !== undefined) return this._props;
		return this._props = buildGridProps(this.ID.schema)
	}
}
