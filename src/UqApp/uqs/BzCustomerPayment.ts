//=== UqApp builder created on Tue Jan 12 2021 19:32:59 GMT-0500 (GMT-05:00) ===//
import { UqTuid, UqSheet, UqBook, UqQuery, UqMap, UqHistory, UqPending } from "tonva-react";


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
};

export enum EnumPendingDone {
	pending = 0,
	done = 1,
	cancel = -1,
	red = -2
};

export enum EnumCustomerPayType {
	direct = 1,
	receivable = 2
};

export declare namespace BzCustomerPayment {
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
		quantity: any;
		amount: any;
	}[];
}

export interface SheetDeposit {
	customer: number;
	deposit: any;
	receiptNo: string;
	bankReceiptNo: string;}

export interface SheetInvoice {
	customer: number;
	detail: {
		pendingId: number;
		amount: any;
	}[];
}

export interface SheetDeliver {
	customer: number;
	detail: {
		pendingId: number;
		quantity: any;
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
	quantity: any;
	delivered: any;
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
	amount: any;
	amountInvoice: any;
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
	amount: any;
	amountPaid: any;
}
interface ResultCustomerPendingReceivable {
	ret: ReturnCustomerPendingReceivableRet[];
}

export interface ParamGetCustomerAccount {
	customer: number;
}
interface ReturnGetCustomerAccountRet {
	customer: number;
	deposit: any;
	receivable: any;
	invoiceShould: any;
	invoicePre: any;
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
	value: any;
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
	deposit: any;
	receivable: any;
	invoiceShould: any;
	invoicePre: any;
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
	value: any;
}
interface ReturnCustomerHistory$page {
	date: any;
	customer: number;
	action: any;
	sheet: number;
	row: number;
	user: number;
	value: any;
}
interface ResultCustomerHistory {
	$page: ReturnCustomerHistory$page[];
}


export interface UqBzCustomerPayment {
	$name: string;
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
}
