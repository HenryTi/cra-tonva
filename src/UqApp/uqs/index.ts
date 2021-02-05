//=== UqApp builder created on Thu Feb 04 2021 17:42:19 GMT-0500 (GMT-05:00) ===//
import * as BzHelloTonva from './BzHelloTonva';
import { Coms as BzHelloTonvaComs } from './BzHelloTonva.Coms';
import * as BzCustomerPayment from './BzCustomerPayment';
import { Coms as BzCustomerPaymentComs } from './BzCustomerPayment.Coms';
import * as BzTest from './BzTest';
import { Coms as BzTestComs } from './BzTest.Coms';
import * as BzTimesChange from './BzTimesChange';
import { Coms as BzTimesChangeComs } from './BzTimesChange.Coms';

export interface UQs {
	BzHelloTonva: BzHelloTonva.Uq;
	BzCustomerPayment: BzCustomerPayment.Uq;
	BzTest: BzTest.Uq;
	BzTimesChange: BzTimesChange.Uq;
}

export * as BzHelloTonva from './BzHelloTonva';
export * as BzCustomerPayment from './BzCustomerPayment';
export * as BzTest from './BzTest';
export * as BzTimesChange from './BzTimesChange';


export function buildComs(uqs:UQs) {
	uqs.BzHelloTonva.setComs(new BzHelloTonvaComs(uqs.BzHelloTonva));
	uqs.BzCustomerPayment.setComs(new BzCustomerPaymentComs(uqs.BzCustomerPayment));
	uqs.BzTest.setComs(new BzTestComs(uqs.BzTest));
	uqs.BzTimesChange.setComs(new BzTimesChangeComs(uqs.BzTimesChange));
}
