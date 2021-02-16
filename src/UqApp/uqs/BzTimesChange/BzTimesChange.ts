//=== UqApp builder created on Mon Feb 15 2021 23:34:25 GMT-0500 (GMT-05:00) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqQuery, UqID, UqIDX, UqIX } from "tonva-react";


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
	noTimeLog?: number;
}

export interface UserStaff {
	id: number;
	id2: number;
}

export interface ParamIDActs {
	staff?: Staff[];
	hours?: Hours[];
	userStaff?: UserStaff[];
}


export interface UqExt extends Uq {
	IDActs(param:ParamIDActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	$poked: UqQuery<Param$poked, Result$poked>;
	Staff: UqID<any>;
	Hours: UqIDX<any>;
	UserStaff: UqIX<any>;
}
