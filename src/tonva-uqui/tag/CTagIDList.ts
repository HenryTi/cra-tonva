import { Controller } from "tonva-react";
import { IDBase } from "../base";
import { listRight } from "../tools";
import { MidTag, Tag } from "./MidTag";
import { CID, CIDList, MidID, MidIDList } from "../ID";
import { VTags } from "./VTags";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CTagIDList<T extends IDBase> extends  Controller {
	readonly midTag: MidTag;
	constructor(midTag: MidTag, res?:any) {
		super(res);
		this.midTag = midTag;
	}

	protected async internalStart() {
		await this.midTag.load();
		this.openVPage(VTags);
	}

	async showID(tags: Tag[]) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		//let {uq, ID, IX} = this.midTag;
		let midIDList: MidTagIDList<T> = new MidTagIDList<any>(
			this.midTag, tags.map(v => v.id)
		);
		let cShowTagIDList = new CShowTagIDList(midIDList
			/*{
			uq,
			ID,
			//midTag: this.midTag,
			tags: tags.map(v => v.id),
			renderItem: undefined,
			onItemClick: undefined,
		}*/);
		await cShowTagIDList.start();
	}
}

/*
class TagIDListProps<T extends IDBase> extends MidIDList<T> {
	//midTag: MidTag;
	tags: number[];
}
*/

class CShowTagIDList<T extends IDBase> extends CIDList<T> {
	//protected props: TagIDListProps<T>;
	protected midIDList: MidTagIDList<T>;
	constructor(midIDList: MidTagIDList<T>) {
		super(undefined);
		this.midIDList = midIDList;
	}

	async beforeStart():Promise<boolean> {
		await this.midIDList.midTag.load();
		return true;
	}

	/*
	protected createMidList(): MidTagIDList<T> {
		let {midTag, tags} = this.midIDList;
		
		let {uq, ID, IX, tag} = midTag;
		return this.midIDList = new MidTagIDList<T>(uq, tag, IX, ID, tags);
	}
	*/
	
	protected async onItemClick(item:any):Promise<void> {
		let {midTag} = this.midIDList;
		let mid = new MidID(midTag.uq, midTag.ID);
		await mid.loadSchema();
		let cID = new CID(mid, this.res);
		cID.onItemClick(item);
		//let cSelect = new CSelect(this, item, midTag, this.res);
		//cSelect.start();
	}
	

	protected renderRight():JSX.Element {
		let {onRightClick, renderRight} = this.midIDList;
		if (!onRightClick) return null;
		return (renderRight ?? listRight)(onRightClick);
	}

	protected renderItem(item:T, index:number):JSX.Element {
		let {midTag, renderItem} = this.midIDList;
		let {ID} = midTag;
		//let {item, typeArr} = itemTags;
		return (renderItem ??  ID.render)(item, index);
		//return renderItemTags(this.props, itemTags, index);
	}
}

export class MidTagIDList<T extends IDBase> extends MidIDList<T> {
	readonly midTag: MidTag;
	//readonly tag: ID;
	//readonly IX: IX;
	readonly ids: number[];
	//tags: number[];
	constructor(midTag:MidTag, /*IX:IX, /*ID:ID, */ids:number[]) {
		let {uq, ID} = midTag;
		super(uq, ID);
		//this.tag = tag;
		//this.IX = IX;
		this.ids = ids;
	}
 
	async init() {
		await this.midTag.IX.loadSchema();
	}

	protected async loadPageItems(pageStart:any, pageSize:number):Promise<T[]> {
		let result = await this.uq.IXr<T>({
			IX: this.midTag.IX,
			IDX: [this.ID],
			id: this.ids,
			page: {start:pageStart, size:pageSize},
		});
		return result;
	}
}
