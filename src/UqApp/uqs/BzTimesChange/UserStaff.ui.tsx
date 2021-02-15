import { Res, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldUI, FieldUIString } from "tonva-react";
import { UserStaff } from "./BzTimesChange";

export function render(item: UserStaff):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};

const fieldItems:FieldItem[] = [
];
/*==fieldItems==
const fieldItems:FieldItem[] = [
// IX
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
		// IX
		widget: "string",
	} as FieldUIString,
};
==fieldUIs==*/

export const ui:UI = {
	label: "UserStaff",
	fieldItems,
	fieldUIs,
};

export const res:Res<any> = {
	zh: {
	},
	en: {
	}
};
