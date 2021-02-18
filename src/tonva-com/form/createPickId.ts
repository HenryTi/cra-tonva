import { ID, Uq } from "tonva-react";
import { CIDSelect, IDSelectProps } from "../select";

export function createPickId(uq: Uq, ID: ID): () => Promise<any> {
	async function pickId() {
		let props: IDSelectProps<any> = {
			uq,
			ID,
			renderItem: undefined,
			onSelectChange: undefined,
		};
		let cIDSelect = new CIDSelectInPickId(props, undefined);
		return cIDSelect.call();
	}
	return pickId;
}

export class CIDSelectInPickId extends CIDSelect<any, IDSelectProps<any>> {
	constructor(props: IDSelectProps<any>, res?:any) {
		super(props, res);
		this.props.onSelectChange = this.onSelectChange;
	}

	private onSelectChange = (item:any, isSelected:boolean) => {
		this.closePage();
		this.returnCall(item);
	}
}
