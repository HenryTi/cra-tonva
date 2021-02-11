import { runInAction } from "mobx";
import { ID, Uq } from "tonva-react";
import { CList, MidList } from "../list";
import { Tag } from "./Mid";
import { renderRight } from "./parts";

export interface TagListProps {
	uq: Uq;
	ID: ID;
	type: string;		// 大类
	item: any;
}

export class CTagList extends CList<Tag> {
	props: TagListProps;
	midTagList: MidTagList;
	constructor(props:TagListProps, res:any) {
		super(res);
		this.props = props;
	}
	protected createMidList(): MidTagList {
		let {uq, ID, type} = this.props;
		return this.midTagList = new MidTagList(uq, ID, type);
	}
	protected onItemClick(item:any):void {
		//this.props.onItemClick?.(item);
	}

	protected renderRight():JSX.Element {
		return renderRight(this.onRightClick);
	}

	private onRightClick = () => {
		alert('right');
	}
}


class MidTagList extends MidList<Tag> {
	readonly tagID:ID;
	readonly type:string;
	constructor(uq:Uq, tagID:ID, type:string) {
		super(uq);
		this.tagID = tagID;
		this.type = type;
	}

	async init() {
		await this.tagID.loadSchema();
	}

	protected async loadPageItems(pageStart:any, pageSize:number):Promise<Tag[]> {
		/*
		ID: ID;
		key: {[key:string]:string|number};
		IDX?: (ID|IDX)[];
		page?: ParamPage;
		*/
		let ret = await this.uq.IDTree<Tag>({
			ID: this.tagID,
			parent: 0,
			key: this.type,
			level: 3,
			page: {start:pageStart, size:pageSize},
		});
		return ret;
	}

	update(item:Tag) {
		runInAction(() => {
			let {_items} = this.listPageItems;
			if (!_items) return;
			let {id} = item;
			if (id < 0) {
				let index = _items.findIndex(v => v.id === -id);
				if (index >= 0) _items.splice(index, 1);
			}
			else {
				let ret = _items.find(v => v.id === id);
				if (!ret) {
					_items.unshift({id} as Tag);
				}
			}
		});
	}
}
