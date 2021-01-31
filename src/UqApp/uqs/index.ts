//=== UqApp builder created on Sun Jan 31 2021 09:39:43 GMT-0500 (GMT-05:00) ===//
import * as BzHelloTonva from './BzHelloTonva';
import * as BzCustomerPayment from './BzCustomerPayment';
import * as BzTest from './BzTest';

export interface UQs {
	BzHelloTonva: BzHelloTonva.Uq;
	BzCustomerPayment: BzCustomerPayment.Uq;
	BzTest: BzTest.Uq;
}

export * as BzHelloTonva from './BzHelloTonva';
export * as BzCustomerPayment from './BzCustomerPayment';
export * as BzTest from './BzTest';
