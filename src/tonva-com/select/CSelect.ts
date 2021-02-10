import { ID, Uq } from "tonva-react";
import { IDBase } from "../base";
import { CList, MidList } from "../list";
import { renderItem } from "../tools";
import { renderSelectItem } from "./parts";

export interface SelectProps<T extends IDBase> {
	uq: Uq;
	ID: ID;
	renderItem: (item:T, index:number)=>JSX.Element;
	onSelectChange: (item:T, isSelected:boolean)=>any;
}

export class CSelect<T extends IDBase, P extends SelectProps<T>> extends CList<T> {
	props: P;
	constructor(props: P, res:any) {
		super(res);
		this.props = props;
	}

	protected createMidList(): MidList<T> {
		return new MidSelectList(this.props.uq, this.props.ID);
	}
	protected onItemClick(item:any):void {
		return; //this.props.onItemClick(item);
	}

	protected renderRight():JSX.Element {
		return null;
	}

	protected renderItem(item:any, index:number):JSX.Element {
		let onChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
			let {onSelectChange} = this.props;
			onSelectChange?.(item, evt.currentTarget.checked);
		}
		let content = (this.props.renderItem ?? renderItem)(item, index);
		let {$in} = item;
		return renderSelectItem(onChange, content, $in===1);
	}
}

export class MidSelectList<T extends IDBase> extends MidList<T> {
	readonly ID:ID;
	constructor(uq:Uq, ID:ID) {
		super(uq);
		this.ID = ID;
	}

	async init() {
		await this.ID.loadSchema();
	}

	protected async loadPageItems(pageStart:any, pageSize:number):Promise<T[]> {
		let ret = await this.uq.ID<T>({
			IDX: this.ID,
			id: undefined,
			page: {start:pageStart, size:pageSize+1},
		});
		return ret;
	}
}