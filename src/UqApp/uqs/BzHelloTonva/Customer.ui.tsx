import { Res, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldUI, FieldUIString } from "tonva-react";
import { Customer } from "./BzHelloTonva";

export function render(item: Customer):JSX.Element {
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
		name: 'no',
		key: true,
	},
	{
		name: 'firstName',
		key: false,
	},
	{
		name: 'lastName',
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
	label: "Customer",
	fieldItems,
	fieldUIs,
};

export const res:Res<any> = {
	zh: {
	},
	en: {
	}
};
