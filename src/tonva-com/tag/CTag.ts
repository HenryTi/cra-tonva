import { Controller } from "tonva-react";
import { ComTag } from "./Com";
//import { CApp, UQs } from "UqApp";
import { VTag } from "./VTag";
import { VTagEdit } from "./VTagEdit";

export class CTag extends Controller {
	com: ComTag;
	constructor(com:ComTag, res?:any) {
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
