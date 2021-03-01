import { ButtonSchema, ID, Schema, UiButton, UiSchema, Uq } from "tonva-react";

export abstract class Mid {
	readonly uq: Uq;
	readonly res: any;
	constructor(uq: Uq, res?: any) {
		this.uq = uq;
		this.res = res;
	}

	buildItemSchema(ID: ID): Schema {
		let ret:Schema = [];
		let {fieldArr} = ID.ui;
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

	buildUISchema(ID:ID):UiSchema {
		let {fields} = ID.ui;
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
}
