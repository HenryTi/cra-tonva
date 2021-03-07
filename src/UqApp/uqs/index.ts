//=== UqApp builder created on Thu Mar 04 2021 21:23:54 GMT-0500 (GMT-05:00) ===//
import * as BzHelloTonva from './BzHelloTonva';

export interface UQs {
	BzHelloTonva: BzHelloTonva.UqExt;
}

export * as BzHelloTonva from './BzHelloTonva';

export function setUI(uqs:UQs) {
	BzHelloTonva.setUI(uqs.BzHelloTonva);
}
