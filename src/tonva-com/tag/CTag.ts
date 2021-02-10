import { Controller } from "tonva-react";
import { MidTag } from "./Mid";
import { VTag } from "./VTag";
import { VTagEdit } from "./VTagEdit";

export class CTag extends Controller {
	com: MidTag;
	constructor(com:MidTag, res?:any) {
		super(res);
		this.com = com;
	}

	protected async internalStart() {
		this.openVPage(VTag);
	}

	editTag = (id:number) => {
		this.openVPage(VTagEdit, id);
	}
}
