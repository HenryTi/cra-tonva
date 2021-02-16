//=== UqApp builder created on Mon Feb 15 2021 23:34:25 GMT-0500 (GMT-05:00) ===//
import * as BzHelloTonva from './BzHelloTonva';
import * as BzCustomerPayment from './BzCustomerPayment';
import * as BzTest from './BzTest';
import * as BzTimesChange from './BzTimesChange';

export interface UQs {
	BzHelloTonva: BzHelloTonva.UqExt;
	BzCustomerPayment: BzCustomerPayment.UqExt;
	BzTest: BzTest.UqExt;
	BzTimesChange: BzTimesChange.UqExt;
}

export * as BzHelloTonva from './BzHelloTonva';
export * as BzCustomerPayment from './BzCustomerPayment';
export * as BzTest from './BzTest';
export * as BzTimesChange from './BzTimesChange';

export function setUI(uqs:UQs) {
	BzHelloTonva.setUI(uqs.BzHelloTonva);
	BzCustomerPayment.setUI(uqs.BzCustomerPayment);
	BzTest.setUI(uqs.BzTest);
	BzTimesChange.setUI(uqs.BzTimesChange);
}
