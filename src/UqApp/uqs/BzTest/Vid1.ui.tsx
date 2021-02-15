import { Res, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldUI, FieldUIString } from "tonva-react";
import { Vid1 } from "./BzTest";

export function render(item: Vid1):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};

const fieldItems:FieldItem[] = [
];
/*==fieldItems==
const fieldItems:FieldItem[] = [
	{
		name: 'id',
		key: false,
	},
	{
		name: 'b1',
		key: true,
	},
	{
		name: 'b2',
		key: true,
	},
	{
		name: 'b3',
		key: false,
	},
	{
		name: 'm6',
		key: false,
	},
];
==fieldItems==*/

const fieldUIs:{[name:string]:FieldUI} = {
	"a": {
		label: "中文",
		placeholder: undefined,
		widget: "string",
	} as FieldUIString,
};
/*==fieldUIs==
const fieldUIs:{[name:string]:FieldUI} = {
	"a": {
		label: "中文",
		placeholder: undefined,
		// ID
		widget: "string",
	} as FieldUIString,
};
==fieldUIs==*/

export const ui:UI = {
	label: "Vid1",
	fieldItems,
	fieldUIs,
};

export const res:Res<any> = {
	zh: {
	},
	en: {
	}
};
