//=== UqApp builder created on Sun Jan 31 2021 09:39:43 GMT-0500 (GMT-05:00) ===//
import { UqBase, UqTuid, UqAction, UqBook, UqQuery } from "tonva-react";


//===============================
//======= UQ BizDev/hello-tonva ========
//===============================

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

export interface Tuid$user {
	name: string;
	nick: string;
	icon: string;
	assigned: string;
	poke: number;
}

export interface TuidProduct {
	name: string;
}

export interface ParamWriteProductStock {
	product: number;
	stock: number;
}
interface ResultWriteProductStock {
}

export interface ParamTestArr {
	rows: {
		a: number;
		b: number;
	}[];

}
interface ReturnTestArrRet {
	a: number;
	b: number;
}
interface ResultTestArr {
	ret: ReturnTestArrRet[];
}

export interface ParamGetProductStock {
	product: number;
}
interface ReturnGetProductStockRet {
	product: number;
	stock: number;
}
interface ResultGetProductStock {
	ret: ReturnGetProductStockRet[];
}

export interface Param$poked {
}
interface Return$pokedRet {
	poke: number;
}
interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamBookProduct {
}
interface ReturnBookProduct$page {
	product: number;
	stock: number;
}
interface ResultBookProduct {
	$page: ReturnBookProduct$page[];
}

export interface ParamIDActs {
}


export interface Uq extends UqBase<ParamIDActs> {
	$sheet: UqTuid<Tuid$sheet>;
	$user: UqTuid<Tuid$user>;
	Product: UqTuid<TuidProduct>;
	WriteProductStock: UqAction<ParamWriteProductStock, ResultWriteProductStock>;
	TestArr: UqAction<ParamTestArr, ResultTestArr>;
	BookProduct: UqBook<ParamBookProduct, ResultBookProduct>;
	GetProductStock: UqQuery<ParamGetProductStock, ResultGetProductStock>;
	$poked: UqQuery<Param$poked, Result$poked>;
}
