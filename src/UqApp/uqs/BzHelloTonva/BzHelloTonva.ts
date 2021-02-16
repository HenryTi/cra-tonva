//=== UqApp builder created on Mon Feb 15 2021 23:34:25 GMT-0500 (GMT-05:00) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqBook, UqQuery, UqID, UqIX } from "tonva-react";


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

export interface Customer {
	id?: number;
	no?: string;
	firstName: string;
	lastName: string;
}

export interface OrderMaster {
	id?: number;
	no?: string;
	customer: number;
}

export interface OrderDetail {
	id?: number;
	master?: number;
	row?: number;
	product: number;
	price: number;
	quantity: number;
	amount: number;
}

export interface Tag {
	id?: number;
	parent: number;
	name: string;
}

export interface CustomerTag {
	id: number;
	id2: number;
}

export interface ParamIDActs {
	customer?: Customer[];
	orderMaster?: OrderMaster[];
	orderDetail?: OrderDetail[];
	tag?: Tag[];
	customerTag?: CustomerTag[];
}


export interface UqExt extends Uq {
	IDActs(param:ParamIDActs): Promise<any>;

	$sheet: UqTuid<Tuid$sheet>;
	$user: UqTuid<Tuid$user>;
	Product: UqTuid<TuidProduct>;
	WriteProductStock: UqAction<ParamWriteProductStock, ResultWriteProductStock>;
	TestArr: UqAction<ParamTestArr, ResultTestArr>;
	BookProduct: UqBook<ParamBookProduct, ResultBookProduct>;
	GetProductStock: UqQuery<ParamGetProductStock, ResultGetProductStock>;
	$poked: UqQuery<Param$poked, Result$poked>;
	Customer: UqID<any>;
	OrderMaster: UqID<any>;
	OrderDetail: UqID<any>;
	Tag: UqID<any>;
	CustomerTag: UqIX<any>;
}
