import { Uq } from "tonva-react";

export abstract class Mid {
	readonly uq: Uq;
	constructor(uq: Uq) {
		this.uq = uq;
	}
}
