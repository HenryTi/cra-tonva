import { Res, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { IBook1 } from "./BzTest";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	f1: {
		"name": "f1",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "F1"
	} as FieldItemNum,
	f2: {
		"name": "f2",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "F2"
	} as FieldItemInt,
	b: {
		"name": "b",
		"type": "string",
		"isKey": false,
		"widget": "string",
		"label": "B"
	} as FieldItemString,
	c: {
		"name": "c",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "C"
	} as FieldItemInt,
};
/*==fields==*/

export const fieldArr: FieldItem[] = [
	fields.f1, fields.f2, fields.b, fields.c, 
];

export const ui: UI = {
	label: "IBook1",
	fieldArr,
	fields,
};

export const res: Res<any> = {
	zh: {
	},
	en: {
	}
};

export function render(item: IBook1):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};
