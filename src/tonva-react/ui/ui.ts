import { FieldItem } from "./fieldItem";
import { FieldUI } from "./fieldUI";

export type Render<T> = (item: T) => JSX.Element;
export interface UI {
	label: string;
	fieldItems: FieldItem[];
	fieldUIs: {[name:string]:FieldUI};
}
