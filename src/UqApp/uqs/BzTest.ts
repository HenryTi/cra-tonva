//=== UqApp builder created on Thu Feb 04 2021 17:42:19 GMT-0500 (GMT-05:00) ===//
import { Coms } from "./BzTest.Coms";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, UqBase, UqTuid, UqAction, UqBook, UqQuery, UqMap, UqHistory, UqID, UqIDX, UqID2 } from "tonva-react";


//===============================
//======= UQ BizDev/test ========
//===============================

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

export interface TuidT1 {
	a: string;
	t2: string;
}

export interface TuidTestTuid {
	name: string;
	t: number;
}

export interface TuidSubject {
	name: string;
	discription: string;
}

export interface ParamNotify {
	subject: string;
	discription: string;
	delta: number;
	balance: number;
}
interface ResultNotify {
}

export interface ParamA {
}
interface ResultA {
}

export interface ParamAct {
}
interface ResultAct {
}

export interface ParamTestQueryBus {
	p: number;
}
interface ReturnTestQueryBusMain {
	p1: string;
	p2: number;
	p3: number;
	$id: number;
}
interface ReturnTestQueryBusRetArr {
	a1: string;
	a2: number;
	a3: number;
	a4: number;
	$id: number;
}
interface ReturnTestQueryBusRetArr2 {
	b3: string;
	cb2: number;
	aa3: number;
	$id: number;
}
interface ResultTestQueryBus {
	main: ReturnTestQueryBusMain[];
	retArr: ReturnTestQueryBusRetArr[];
	retArr2: ReturnTestQueryBusRetArr2[];
}

export interface ParamBusSubject {
	id: number;
	name: string;
	discription: string;
}
interface ResultBusSubject {
}

export interface ParamAct1 {
}
interface ResultAct1 {
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

export interface ParamTest {
	aB: number;
}
interface ReturnTestRet {
	aE: number;
	cD: number;
	$id: number;
}
interface ResultTest {
	ret: ReturnTestRet[];
}

export interface ParamCall1 {
}
interface ReturnCall1Ret {
	user: number;
	t1: number;
	$id: number;
}
interface ResultCall1 {
	ret: ReturnCall1Ret[];
}

export interface ParamB {
	user: number;
}
interface ReturnB$page {
	sheet: number;
	t1: number;
	t2: string;
}
interface ResultB {
	$page: ReturnB$page[];
}

export interface ParamH {
	t1: number;
	t2: string;
}
interface ReturnH$page {
	date: any;
	t1: number;
	t2: string;
}
interface ResultH {
	$page: ReturnH$page[];
}

export interface X1 {
	id?: number;
	a1: number;
	a2: number;
	a3: number;
	n5: number;
}

export interface Vid1 {
	id?: number;
	b1: number;
	b2: number;
	b3: number;
	m6: number;
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

export interface OrderMaster {
	id?: number;
	no?: string;
	customer: number;
}

export interface Tag {
	id?: number;
	type: string;
	name: string;
}

export interface IBook1 {
	id: number;
	f1?: number|IDXValue;
	f2?: number|IDXValue;
	b?: string|IDXValue;
	c?: number;
	$track?: number;
	$memo?: string;
}

export interface Assign1 {
	id: number;
	id2: number;
	val: number;
}

export interface CustomerTag {
	id: number;
	id2: number;
}

export interface ParamIDActs {
	x1?: X1[];
	vid1?: Vid1[];
	orderDetail?: OrderDetail[];
	orderMaster?: OrderMaster[];
	tag?: Tag[];
	iBook1?: IBook1[];
	assign1?: Assign1[];
	customerTag?: CustomerTag[];
}


export interface Uq extends UqBase {
	IDActs(param:ParamIDActs): Promise<any>;
	coms: Coms;

	$user: UqTuid<Tuid$user>;
	Product: UqTuid<TuidProduct>;
	$sheet: UqTuid<Tuid$sheet>;
	T1: UqTuid<TuidT1>;
	TestTuid: UqTuid<TuidTestTuid>;
	Subject: UqTuid<TuidSubject>;
	Notify: UqAction<ParamNotify, ResultNotify>;
	A: UqAction<ParamA, ResultA>;
	Act: UqAction<ParamAct, ResultAct>;
	TestQueryBus: UqAction<ParamTestQueryBus, ResultTestQueryBus>;
	BusSubject: UqAction<ParamBusSubject, ResultBusSubject>;
	Act1: UqAction<ParamAct1, ResultAct1>;
	B: UqBook<ParamB, ResultB>;
	$poked: UqQuery<Param$poked, Result$poked>;
	Test: UqQuery<ParamTest, ResultTest>;
	Call1: UqQuery<ParamCall1, ResultCall1>;
	C: UqMap;
	Price: UqMap;
	H: UqHistory<ParamH, ResultH>;
	X1: UqID<any>;
	Vid1: UqID<any>;
	OrderDetail: UqID<any>;
	OrderMaster: UqID<any>;
	Tag: UqID<any>;
	IBook1: UqIDX<any>;
	Assign1: UqID2<any>;
	CustomerTag: UqID2<any>;
}
