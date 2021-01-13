//=== UqApp builder created on Tue Jan 12 2021 19:32:05 GMT-0500 (GMT-05:00) ===//
import { BzHelloTonva } from './BzHelloTonva';
import { BzCustomerPayment } from './BzCustomerPayment';
import { BzTest } from './BzTest';

export interface UQs {
	BzHelloTonva: BzHelloTonva.UqBzHelloTonva;
	BzCustomerPayment: BzCustomerPayment.UqBzCustomerPayment;
	BzTest: BzTest.UqBzTest;
}


export {
	EnumCustomerAction as BzCustomerPaymentEnumCustomerAction,
	EnumPendingDone as BzCustomerPaymentEnumPendingDone,
	EnumCustomerPayType as BzCustomerPaymentEnumCustomerPayType,
} from './BzCustomerPayment';
