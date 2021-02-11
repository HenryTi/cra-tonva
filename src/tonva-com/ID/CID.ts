import { Controller } from "tonva-react";
import { CIDList } from "./CIDList";
import { MidID } from "./Mid";
import { VEdit } from "./VEdit";
import { VView } from "./VView";

export class CID extends Controller {
	mid: MidID;
	idList: CIDList<any>;
	constructor(mid:MidID, res?:any) {
		super(res);
		this.mid = mid;
	}

	protected async internalStart() {
		await this.mid.loadSchema();
		let {uq, ID} = this.mid;
		this.idList = new CIDList({
			uq,
			ID,
			onRightClick: () => this.onItemEdit(),
			renderItem: undefined,
			onItemClick: this.onItemClick,
			renderRight: undefined,
		});
		await this.idList.start();
	}

	renderItem: (item:any, index:number) => JSX.Element;
	item:any;
	onItemClick: (item:any) => void = (item:any) => {
		this.item = item;
		this.onItemView();
	}

	onItemEdit():void {
		this.openVPage(VEdit);
	}

	onItemView():void {
		this.openVPage(VView);
	}

	onItemNew():void {
		this.item = undefined;
		this.openVPage(VEdit);
	}

	async saveID(item:any) {
		let ret = await this.mid.saveID(item);
		//this.pageItems.update(ret, item);
		this.idList.update(ret, item);
		return ret;
	}
}
