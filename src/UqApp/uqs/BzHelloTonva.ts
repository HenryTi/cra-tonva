//=== UqApp builder created on Tue Jan 12 2021 19:32:20 GMT-0500 (GMT-05:00) ===//
import { UqTuid, UqAction, UqBook, UqQuery } from "tonva-react";


//===============================
//======= UQ BizDev/hello-tonva ========
//===============================

export declare namespace BzHelloTonva {
export interface TuidProduct {
	name: string;
}

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

export interface ParamWriteProductStock {
	product: number;
	stock: any;
}
interface ResultWriteProductStock {
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

export interface ParamGetProductStock {
	product: number;
}
interface ReturnGetProductStockRet {
	product: number;
	stock: any;
	$id: number;
}
interface ResultGetProductStock {
	ret: ReturnGetProductStockRet[];
}

export interface ParamBookProduct {
}
interface ReturnBookProduct$page {
	product: number;
	stock: any;
}
interface ResultBookProduct {
	$page: ReturnBookProduct$page[];
}


export interface UqBzHelloTonva {
	$name: string;
	Product: UqTuid<TuidProduct>;
	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	WriteProductStock: UqAction<ParamWriteProductStock, ResultWriteProductStock>;
	BookProduct: UqBook<ParamBookProduct, ResultBookProduct>;
	$poked: UqQuery<Param$poked, Result$poked>;
	GetProductStock: UqQuery<ParamGetProductStock, ResultGetProductStock>;
}
}
