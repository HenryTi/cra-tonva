import { Res, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldUI, FieldUIString } from "tonva-react";
import { IBook1 } from "./BzTest";

export function render(item: IBook1):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};

const fieldItems:FieldItem[] = [
];
/*==fieldItems==
const fieldItems:FieldItem[] = [
// IDX
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
		// IDX
		widget: "string",
	} as FieldUIString,
};
==fieldUIs==*/

export const ui:UI = {
	label: "IBook1",
	fieldItems,
	fieldUIs,
};

export const res:Res<any> = {
	zh: {
	},
	en: {
	}
};
