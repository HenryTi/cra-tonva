import { ID, Schema, UiSchema, Uq, Prop } from "tonva-react";
import { buildGridProps } from "../tools";
import { IDBase, Mid } from "../base";

export class MidID<T extends IDBase> extends Mid {
	readonly ID: ID;
	constructor(uq: Uq, ID: ID) {
		super(uq);
		this.ID = ID;
	}

	async loadSchema() {
		await this.ID.loadSchema();
	}

	async load(id:number): Promise<T[]> {
		let ret = await this.uq.ID<T>({
			IDX: this.ID,
			id,
			page: undefined,
		});
		return ret;
	}
	async saveID(data:any):Promise<number> {
		let param: any = {};
		param[this.ID.name] = [data];
		let ret = await this.uq.IDActs(param);
		let id = ret[this.ID.name];
		if (!id) return;
		return id[0];
	}

	private _itemSchema: Schema;
	get itemSchema(): Schema {
		if (this._itemSchema !== undefined) return this._itemSchema;
		return this._itemSchema = this.buildItemSchema(this.ID);
	}

	/*
	buildItemSchema(): Schema {
		let ret:Schema = [];
		let {fieldArr} = this.ID.ui;
		for (let f of fieldArr) {
			let {type, isKey} = f;
			let required = isKey; // (keys as any[]).findIndex(v => v.name === name) >= 0;
			let fieldItem = {
				...f,
				required,
			};
			switch (type) {
				default: ret.push(fieldItem); break;
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
		let {fields} = this.ID.ui;
		let items = {...fields as any};
		let uiButton: UiButton = {
			label: '提交',
			className: 'btn btn-primary',
			widget: 'button',
		};
		items['submit'] = uiButton;
		let ret = {items};
		return ret;
	}
	*/

	private _props: Prop[];
	get props():Prop[] {
		if (this._props !== undefined) return this._props;
		return this._props = buildGridProps(this.ID.ui);
	}
}
