import { Res, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { Assign1 } from "./BzTest";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	id2: {
		"name": "id2",
		"type": "id",
		"isKey": false,
		"label": "Id2"
	} as FieldItemId,
	val: {
		"name": "val",
		"type": "integer",
		"isKey": false,
		"widget": "updown",
		"label": "Val"
	} as FieldItemInt,
};
/*==fields==*/

export const fieldArr: FieldItem[] = [
	fields.val, 
];

export const ui: UI = {
	label: "Assign1",
	fieldArr,
	fields,
};

export const res: Res<any> = {
	zh: {
	},
	en: {
	}
};

export function render(item: Assign1):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};
