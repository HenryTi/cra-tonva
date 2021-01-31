import { CAppBase, CBase } from "tonva-react";
import { VTag } from "./VTag";

export class CTag<A extends CAppBase<U>, U> extends CBase<A,U> {
	protected async internalStart() {
		this.openVPage(VTag);
	}
}
