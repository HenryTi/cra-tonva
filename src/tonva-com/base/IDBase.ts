import { ID } from "tonva-react";

export interface IDBase {
	id: number;
}

export interface IXBase extends IDBase {
	id2: number;
}

export interface Master {
	id?: number;
}

export interface Detail {
	id?: number;
	master?: number;
	row?: number;
}

export interface IDs {
	ID: ID;
	FieldNO?: string;					// NO field
	FieldIDs?: {[name:string]: ID};
}
