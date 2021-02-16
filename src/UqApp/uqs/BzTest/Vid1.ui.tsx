import { Res, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { Vid1 } from "./BzTest";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	b1: {
		"name": "b1",
		"type": "id",
		"isKey": true,
		"label": "B1"
	} as FieldItemId,
	b2: {
		"name": "b2",
		"type": "id",
		"isKey": true,
		"label": "B2"
	} as FieldItemId,
	b3: {
		"name": "b3",
		"type": "id",
		"isKey": false,
		"label": "B3"
	} as FieldItemId,
	m6: {
		"name": "m6",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "M6"
	} as FieldItemInt,
};
/*==fields==*/

export const fieldArr: FieldItem[] = [
	fields.b1, fields.b2, fields.b3, fields.m6, 
];

export const ui: UI = {
	label: "Vid1",
	fieldArr,
	fields,
};

export const res: Res<any> = {
	zh: {
	},
	en: {
	}
};

export function render(item: Vid1):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};
