import { NumberProp, Prop, StringProp } from "tonva-react";

export function buildGridProps(schema: any):Prop[] {
	let ret:Prop[] = [];
	let {keys, fields, exFields} = schema;
	for (let f of fields) {
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
	}
	return ret;
}
