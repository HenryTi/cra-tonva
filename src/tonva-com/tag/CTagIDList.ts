import { Controller, ID, IX, Uq } from "tonva-react";
import { IDBase } from "../base";
import { listRight } from "../tools";
import { MidTag, Tag } from "./MidTag";
import { CID, CIDList, IDListProps, MidID, MidIDList } from "../ID";
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
		let {uq, ID, IX} = this.midTag;
		let cShowTagIDList = new CShowTagIDList({
			uq,
			ID,
			midTag: this.midTag,
			tags: tags.map(v => v.id),
			renderItem: undefined,
			onItemClick: undefined,
		});
		await cShowTagIDList.start();
	}
}

interface TagIDListProps<T extends IDBase> extends IDListProps<T> {
	midTag: MidTag;
	tags: number[];
}

class CShowTagIDList<T extends IDBase> extends CIDList<T> {
	protected props: TagIDListProps<T>;
	protected midIDList: MidTagIDList<T>;
	constructor(props: TagIDListProps<T>) {
		super(undefined);
		this.props = props;
	}

	async beforeStart():Promise<boolean> {
		await this.props.midTag.load();
		return true;
	}

	protected createMidList(): MidTagIDList<T> {
		let {midTag, tags} = this.props;
		let {uq, ID, IX, tag} = midTag;
		return this.midIDList = new MidTagIDList<T>(uq, tag, IX, ID, tags);
	}
	
	protected async onItemClick(item:any):Promise<void> {
		let {midTag} = this.props;
		let mid = new MidID(midTag.uq, midTag.ID);
		await mid.loadSchema();
		let cID = new CID(mid, this.res);
		cID.onItemClick(item);
		//let cSelect = new CSelect(this, item, midTag, this.res);
		//cSelect.start();
	}
	

	protected renderRight():JSX.Element {
		let {onRightClick, renderRight} = this.props;
		if (!onRightClick) return null;
		return (renderRight ?? listRight)(onRightClick);
	}

	protected renderItem(item:T, index:number):JSX.Element {
		let {midTag, renderItem} = this.props;
		let {ID} = midTag;
		//let {item, typeArr} = itemTags;
		return (renderItem ??  ID.render)(item, index);
		//return renderItemTags(this.props, itemTags, index);
	}
}

class MidTagIDList<T extends IDBase> extends MidIDList<T> {
	readonly tag: ID;
	readonly IX: IX;
	readonly ids: number[];
	constructor(uq:Uq, tag:ID, IX:IX, ID:ID, ids:number[]) {
		super(uq, ID);
		this.tag = tag;
		this.IX = IX;
		this.ids = ids;
	}
 
	async init() {
		await this.IX.loadSchema();
	}

	protected async loadPageItems(pageStart:any, pageSize:number):Promise<T[]> {
		let result = await this.uq.IXr<T>({
			IX: this.IX,
			IDX: [this.ID],
			id: this.ids,
			page: {start:pageStart, size:pageSize},
		});
		return result;
	}
}
