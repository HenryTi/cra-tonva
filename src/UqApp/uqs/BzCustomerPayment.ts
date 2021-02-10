//=== UqApp builder created on Tue Feb 09 2021 22:24:44 GMT-0500 (GMT-05:00) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqSheet, UqBook, UqQuery, UqMap, UqHistory, UqPending } from "tonva-react";


//===============================
//======= UQ BizDev/customer-payment ========
//===============================

export enum EnumCustomerAction {
	order = 1,
	confirm = 2,
	payDirect = 10,
	payReceivable = 11,
	deposit = 12,
	payReturn = 13,
	invoice = 20,
	invoicePre = 21,
	deliver = 30,
	return = 41,
	cancel = 100,
	red = 101
}

export enum EnumPendingDone {
	pending = 0,
	done = 1,
	cancel = -1,
	red = -2
}

export enum EnumCustomerPayType {
	direct = 1,
	receivable = 2
}

export interface Tuid$user {
	name: string;
	nick: string;
	icon: string;
	assigned: string;
	roles: number;
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

export interface SheetOrder {
	customer: number;
	detail: {
		product: number;
		pack: number;
		quantity: number;
		amount: number;
	}[];
}

export interface SheetDeposit {
	customer: number;
	deposit: number;
	receiptNo: string;
	bankReceiptNo: string;}

export interface SheetInvoice {
	customer: number;
	detail: {
		pendingId: number;
		amount: number;
	}[];
}

export interface SheetDeliver {
	customer: number;
	detail: {
		pendingId: number;
		quantity: number;
	}[];
}

export interface SheetPayReceivable {
	customer: number;
	rows: {
		pendingId: number;
	}[];
}
export interface VerifyPayReceivable {
	ret: {
		errorNo: number;
		errorMessage: string;
	}[];
}

export interface Param$poked {
}
interface Return$pokedRet {
	poke: number;
}
interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamCustomerPendingDeliver {
	customer: number;
}
interface ReturnCustomerPendingDeliverRet {
	id: number;
	sheet: number;
	row: number;
	quantity: number;
	delivered: number;
}
interface ResultCustomerPendingDeliver {
	ret: ReturnCustomerPendingDeliverRet[];
}

export interface ParamCustomerPendingInvoice {
	customer: number;
}
interface ReturnCustomerPendingInvoiceRet {
	id: number;
	sheet: number;
	row: number;
	amount: number;
	amountInvoice: number;
}
interface ResultCustomerPendingInvoice {
	ret: ReturnCustomerPendingInvoiceRet[];
}

export interface ParamCustomerPendingReceivable {
	customer: number;
}
interface ReturnCustomerPendingReceivableRet {
	id: number;
	sheet: number;
	row: number;
	amount: number;
	amountPaid: number;
}
interface ResultCustomerPendingReceivable {
	ret: ReturnCustomerPendingReceivableRet[];
}

export interface ParamGetCustomerAccount {
	customer: number;
}
interface ReturnGetCustomerAccountRet {
	customer: number;
	deposit: number;
	receivable: number;
	invoiceShould: number;
	invoicePre: number;
	$id: number;
}
interface ResultGetCustomerAccount {
	ret: ReturnGetCustomerAccountRet[];
}

export interface ParamGetCustomerHistory {
	customer: number;
	earlier: any;
}
interface ReturnGetCustomerHistory$page {
	date: any;
	customer: number;
	action: number;
	sheet: number;
	row: number;
	value: number;
	user: number;
}
interface ResultGetCustomerHistory {
	$page: ReturnGetCustomerHistory$page[];
}

export interface ParamCustomerAccount {
}
interface ReturnCustomerAccount$page {
	customer: number;
	payType: any;
	deposit: number;
	receivable: number;
	invoiceShould: number;
	invoicePre: number;
}
interface ResultCustomerAccount {
	$page: ReturnCustomerAccount$page[];
}

export interface ParamCustomerHistory {
	customer: number;
	action: any;
	sheet: number;
	row: number;
	user: number;
	value: number;
}
interface ReturnCustomerHistory$page {
	date: any;
	customer: number;
	action: any;
	sheet: number;
	row: number;
	user: number;
	value: number;
}
interface ResultCustomerHistory {
	$page: ReturnCustomerHistory$page[];
}

export interface ParamIDActs {
}


export interface UqExt extends Uq {
	IDActs(param:ParamIDActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	Order: UqSheet<SheetOrder, any>;
	Deposit: UqSheet<SheetDeposit, any>;
	Invoice: UqSheet<SheetInvoice, any>;
	Deliver: UqSheet<SheetDeliver, any>;
	PayReceivable: UqSheet<SheetPayReceivable, VerifyPayReceivable>;
	CustomerAccount: UqBook<ParamCustomerAccount, ResultCustomerAccount>;
	$poked: UqQuery<Param$poked, Result$poked>;
	CustomerPendingDeliver: UqQuery<ParamCustomerPendingDeliver, ResultCustomerPendingDeliver>;
	CustomerPendingInvoice: UqQuery<ParamCustomerPendingInvoice, ResultCustomerPendingInvoice>;
	CustomerPendingReceivable: UqQuery<ParamCustomerPendingReceivable, ResultCustomerPendingReceivable>;
	GetCustomerAccount: UqQuery<ParamGetCustomerAccount, ResultGetCustomerAccount>;
	GetCustomerHistory: UqQuery<ParamGetCustomerHistory, ResultGetCustomerHistory>;
	OrderDetail: UqMap;
	UserCustomer: UqMap;
	CustomerHistory: UqHistory<ParamCustomerHistory, ResultCustomerHistory>;
	PendingOrderReceivable: UqPending<any, any>;
	PendingOrderDeliver: UqPending<any, any>;
	PendingOrderInvoice: UqPending<any, any>;
	PendingOrderReturn: UqPending<any, any>;
}
