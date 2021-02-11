import { Controller } from "tonva-react";
import { CIDTagList } from "./CIDTagList";
import { MidTag } from "./Mid";

export class CTag extends Controller {
	midTag: MidTag;
	constructor(midTag: MidTag, res?:any) {
		super(res);
		this.midTag = midTag;
	}

	protected async internalStart() {
		await this.midTag.load();
		let cIDTagList = new CIDTagList({
			midTag: this.midTag,
			onRightClick: undefined,
			renderItem: undefined,
			renderRight: undefined,
		});
		await cIDTagList.start();
	}
}
