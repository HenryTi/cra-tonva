import { makeObservable, observable } from "mobx";
import { IDBase } from "tonva-com/base";
import { Controller } from "tonva-react";
import { CIDList } from "./CIDList";
import { MidID } from "./MidID";
import { VEdit } from "./VEdit";
import { VView } from "./VView";

export class CID<T extends IDBase> extends Controller {
	mid: MidID<T>;
	idList: CIDList<any>;
	constructor(mid:MidID<T>, res?:any) {
		super(res);
		this.mid = mid;
		makeObservable(this, {
			item: observable,
		});
	}

	protected async internalStart() {
		//await this.mid.loadSchema();
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

	async saveID(itemProps:any) {		
		let id = this.item?.id;
		let item = {
			...itemProps,
			id,
		}
		let ret = await this.mid.saveID(item);
		if (ret) id = ret;
		this.idList.update(id, item);
		Object.assign(this.item, item);
		return ret;
	}
}
