//=== UqApp builder created on Thu Feb 04 2021 17:42:19 GMT-0500 (GMT-05:00) ===//
import { Coms } from "./BzTimesChange.Coms";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, UqBase, UqTuid, UqQuery, UqID, UqIDX } from "tonva-react";


//===============================
//======= UQ BizDev/TimesChange ========
//===============================

export interface Tuid$user {
	name: string;
	nick: string;
	icon: string;
	assigned: string;
	poke: number;
}

export interface Tuid$sheet {
	no: string;
	user: number;
	date: any;
	sheet: number;
	version: number;
	flow: number;
	app: number;
	state: number;
	discription: string;
	data: string;
	processing: number;
}

export interface Param$poked {
}
interface Return$pokedRet {
	poke: number;
	$id: number;
}
interface Result$poked {
	ret: Return$pokedRet[];
}

export interface Staff {
	id?: number;
	no?: string;
	firstName: string;
	lastName: string;
}

export interface Hours {
	id: number;
	onsite?: number|IDXValue;
	offsite?: number|IDXValue;
	break?: number|IDXValue;
	sick?: number|IDXValue;
	over?: number|IDXValue;
}

export interface ParamIDActs {
	staff?: Staff[];
	hours?: Hours[];
}


export interface Uq extends UqBase {
	IDActs(param:ParamIDActs): Promise<any>;
	coms: Coms;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	$poked: UqQuery<Param$poked, Result$poked>;
	Staff: UqID<any>;
	Hours: UqIDX<any>;
}
