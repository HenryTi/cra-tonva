import { Controller } from "tonva-react";
import { ListPageItems } from "../tools";
import { CIDList } from "./CIDList";
import { MidID } from "./Mid";
import { VEdit } from "./VEdit";
import { VView } from "./VView";

export class CID extends Controller {
	mid: MidID;
	private pageItems: ListPageItems<any>;
	constructor(mid:MidID, res?:any) {
		super(res);
		this.mid = mid;
		this.pageItems = new ListPageItems<any>(mid.comPageItems);
	}

	protected async internalStart() {
		await this.mid.loadSchema();
		let {uq, ID} = this.mid;
		let idList = new CIDList({
			uq,
			ID,
			onRightClick: this.onItemEdit,
			renderItem: undefined,
			onItemClick: this.onItemClick,
			renderRight: undefined,
		});
		await idList.start();
	}

	renderItem: (item:any, index:number) => JSX.Element;
	item:any;
	onItemClick: (item:any) => void = (item:any) => {
		this.item = item;
		this.onItemView();
	}
	get items(): any {return this.pageItems};

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
		this.pageItems.update(ret, item);
		return ret;
	}
}
