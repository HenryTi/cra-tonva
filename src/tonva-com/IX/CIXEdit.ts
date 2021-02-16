import { ID } from "tonva-react";
import { CIX, IXProps } from "./CIX";
import { CIXList } from "./CIXList";
import { CIXSelect } from "../select";

export interface IXEditProps extends IXProps {
	ID: ID;
}

export class CIXEdit extends CIX<IXEditProps> {
	private cIXList: CIXList<any, any>;
	protected async internalStart() {
		let {uq, IX, ID, id} = this.props;
		this.cIXList = new CIXList({
			uq,
			IX,
			ID,
			id,
			onRightClick: this.onListRightClick,
			renderItem: undefined,
			onItemClick: undefined,
			renderRight: undefined,
		});
		await this.cIXList.start();		
	}

	private onListRightClick = async () => {
		let {uq, ID, IX, id} = this.props;
		let cSelect = new CIXSelect({
			uq,
			ID,
			IX,
			id,
			renderItem: undefined,
			onSelectChange: this.onSelectChange,
		}, this.res);
		await cSelect.start();
	}

	private onSelectChange = async (item:any, isSelected:boolean) => {
		let param:any = {};
		let {IX, id} = this.props;
		if (isSelected === false) {
			// id negtive means delete
			id = -id;
		}
		let id2Item = {id, id2: item.id};
		param[IX.name] = [id2Item];
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		let ret = await this.props.uq.IDActs(param);
		this.cIXList.update(id2Item);
	} 
}
