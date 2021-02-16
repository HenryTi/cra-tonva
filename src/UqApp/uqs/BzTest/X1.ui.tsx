import { Res, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { X1 } from "./BzTest";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	a1: {
		"name": "a1",
		"type": "id",
		"isKey": true,
		"label": "A1"
	} as FieldItemId,
	a2: {
		"name": "a2",
		"type": "id",
		"isKey": true,
		"label": "A2"
	} as FieldItemId,
	a3: {
		"name": "a3",
		"type": "id",
		"isKey": false,
		"label": "A3"
	} as FieldItemId,
	n5: {
		"name": "n5",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "N5"
	} as FieldItemInt,
};
/*==fields==*/

export const fieldArr: FieldItem[] = [
	fields.a1, fields.a2, fields.a3, fields.n5, 
];

export const ui: UI = {
	label: "X1",
	fieldArr,
	fields,
};

export const res: Res<any> = {
	zh: {
	},
	en: {
	}
};

export function render(item: X1):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};
