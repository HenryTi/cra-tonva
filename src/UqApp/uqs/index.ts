//=== UqApp builder created on Wed Feb 10 2021 20:26:14 GMT-0500 (GMT-05:00) ===//
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

export function setRenders(uqs:UQs) {
	BzHelloTonva.setRenders(uqs.BzHelloTonva);
	BzCustomerPayment.setRenders(uqs.BzCustomerPayment);
	BzTest.setRenders(uqs.BzTest);
	BzTimesChange.setRenders(uqs.BzTimesChange);
}
