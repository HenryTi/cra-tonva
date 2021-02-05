//=== UqApp builder created on Mon Feb 01 2021 17:59:53 GMT-0500 (GMT-05:00) ===//
import { ComTag } from "tonva-com";
import { Uq } from "./BzTest";

export class Coms {
	constructor(uq: Uq) {
		this.customer = new ComTag(uq, uq.Tag, uq.CustomerTag);
	}
	
	readonly customer: ComTag;
}