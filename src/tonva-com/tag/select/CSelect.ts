import { Controller } from "tonva-react";
import { MidTag } from "../Mid";
import { VSelect } from "./VSelect";

export class CSelect extends Controller {
	item: any;
	midTag: MidTag;
	constructor(item:any, midTag: MidTag, res:any) {
		super(res);
		this.item = item;
		this.midTag = midTag;
	}

	protected async internalStart() {
		this.openVPage(VSelect);
	}

	protected onItemClick(item:any):void {
		return; //this.props.onItemClick(item);
	}

	protected renderRight():JSX.Element {
		return null;
	}

	onTagSelectChanged = (id:number, selected:boolean) => {
		alert(id + '=' + (selected? 'yes' : 'no'));
	}
}
