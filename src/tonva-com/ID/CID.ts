import { makeObservable, observable, runInAction } from "mobx";
import { IDBase } from "tonva-com/base";
import { Controller } from "tonva-react";
import { CIDList } from "./CIDList";
import { MidID } from "./MidID";
import { MidIDList } from "./MidIDList";
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
		let {uq, ID} = this.mid;
		let midIDList = new MidIDList(uq, ID);
		midIDList.onRightClick = this.onItemEdit;
		midIDList.renderItem = undefined;
		midIDList.onItemClick = this.onItemClick;
		midIDList.renderRight = undefined;
		this.idList = new CIDList(midIDList);
		await this.idList.start();
	}

	renderItem: (item:any, index:number) => JSX.Element;
	item:any;
	onItemClick: (item:any) => void = (item:any) => {
		runInAction(() => {
			this.item = item;
			this.onItemView();	
		});
	}

	onItemEdit = (): void => {
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
		runInAction(() => {
			Object.assign(this.item, item);
		});
		return ret;
	}
}
