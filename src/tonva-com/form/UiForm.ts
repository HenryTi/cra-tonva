import { FieldItem, FieldItemId, FieldItemString, ID, UI } from "tonva-react";

export class UiForm {
	label: string;
	readonly fieldArr: FieldItem[];
	readonly fields: {[name:string]: FieldItem};
	onSubmit: (values:any) => Promise<void>;

	constructor(ui: UI) {
		let {label, fieldArr, fields} = ui;
		this.label = label;
		this.fieldArr = [];
		this.fields = {};
		for (let i in fields) {
			let field = fields[i];
			let index = fieldArr.findIndex(v => v === field);
			let f = {...field};
			this.fields[i] = f;
			this.fieldArr[index] = f;
		}
	}

	setFieldIDs(FieldIDs: {[name:string]:ID}) {
		for (let i in FieldIDs) {
			let FieldID = FieldIDs[i];
			if (FieldID === undefined) continue;
			let field = this.fields[i];
			if (field === undefined) continue;
			this.setDefaultIDUi(field, FieldID);
		}
	}

	private setDefaultIDUi(field:FieldItem, FieldID:ID) {
	}

	setIDUi(fieldName:string, pickId: () => Promise<any>, render: (values:any) => JSX.Element) {
		let field = this.fields[fieldName];
		if (field === undefined) {
			alert(`${fieldName} not defined in UI`);
			return;
		}
		if (field.type !== 'id') {
			alert(`${fieldName} is not id UI`);
			return;
		}
		let idField = field as FieldItemId;
		idField.widget = 'id';
		idField.pickId = pickId;
		(idField as any).Templet = render;
	}

	setNO(no:string, fieldName:string = 'no') {
		let field = this.fields[fieldName];
		if (!field) return;
		if (field.type !== 'string') return;
		let noField = field as FieldItemString;
		noField.readOnly = true;
		noField.defaultValue = no;
	}
}
