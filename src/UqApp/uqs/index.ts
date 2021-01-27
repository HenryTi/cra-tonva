//=== UqApp builder created on Tue Jan 26 2021 17:21:56 GMT-0500 (GMT-05:00) ===//
import { BzHelloTonva } from './BzHelloTonva';
import { BzCustomerPayment } from './BzCustomerPayment';
import { BzTest } from './BzTest';

export interface UQs {
	BzHelloTonva: BzHelloTonva.Uq;
	BzCustomerPayment: BzCustomerPayment.Uq;
	BzTest: BzTest.Uq;
}

export * from './BzHelloTonva';
export * from './BzCustomerPayment';
export * from './BzTest';
