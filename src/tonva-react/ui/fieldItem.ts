import { FieldUIType } from "./fieldUI";

export type FieldItemType = 'id' | 'integer' | 'number' | 'string' | 'image' | 'date' | 'boolean' 
| 'object' | 'arr' | 'button' | 'submit';

export interface FieldItem {
	name: string;
	type: FieldItemType;
	label?: string;
	isKey?: boolean;
    required?: boolean;
	widget?: FieldUIType;
    className?: string;
	defaultValue?: string;
}

export interface FieldItemObject extends FieldItem {
    type: 'object';
}

export interface FieldItemId extends FieldItem {
    type: 'id';
	pickId: (values:any) => Promise<any>;
	render: (values:any) => JSX.Element;
}

export interface FieldItemNumBase extends FieldItem {
    type: 'integer' | 'number';
    min?: number;
    max?: number;
	readOnly?: true;
}

export interface FieldItemInt extends FieldItemNumBase {
    type: 'integer';
}

export interface FieldItemNum extends FieldItemNumBase {
    type: 'number';
}

export type FieldItemNumber = FieldItemNum;

export interface FieldItemBool extends FieldItem {
    type: 'boolean';
}

export interface FieldItemString extends FieldItem {
    type: 'string';
    maxLength?: number;
	readOnly?: true;
}

export interface FieldItemImage extends FieldItem {
    type: 'image';
}

export interface FieldItemDate extends FieldItem {
    type: 'date';
}

export interface FieldItemArr extends FieldItem {
    type: 'arr';
    arr: FieldItem[];
    FieldItems: {[name:string]: FieldItem};
}

export interface FieldItemButton extends FieldItem {
    type: 'button' | 'submit';
}

export type FieldItems = FieldItem[];
