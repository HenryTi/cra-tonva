// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NumberProp, Prop, StringProp, UI } from "tonva-react";

export function buildGridProps(ui: UI):Prop[] {
	let ret:Prop[] = [];
	let {fieldArr} = ui;
	//let {keys, fields, exFields} = schema;
	for (let f of fieldArr) {
		let prop = {
			...f
		};
		ret.push(prop as any);
		/*
		let {name, type} = f;
		let required = (keys as any[])?.findIndex(v => v.name === name) >= 0;
		let ex = (exFields as any[])?.find(v => v.field === name);
		let time = ex?.time;
		switch (type) {
			default: throw new Error(`schema type ${type} not implemented`);
			case 'id':
				break;
			case 'char':
				ret.push({
					name,
					label: name,
					type: 'string',
				} as StringProp);
				break;
			case 'tinyint':
			case 'smallint':
			case 'int':
			case 'bigint':
				ret.push({
					name,
					label: name,
					type: 'number',
					isInt: true,
					time
				} as NumberProp);
				break;
			case 'dec':
				ret.push({
					name,
					label: name,
					type: 'number',
					isInt: false,
					time
				} as NumberProp);
				break;
		}
		*/
	}
	return ret;
}
