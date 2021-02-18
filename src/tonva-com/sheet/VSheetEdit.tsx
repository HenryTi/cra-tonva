import { FA, List, LMR, VPage } from "tonva-react";
import { CSheet } from "./CSheet";

export class VSheetEdit extends VPage<CSheet<any, any>> {
	header() {return 'sheet';}
	right() {
		return <button className="btn btn-primary btn-sm mr-2"
			onClick={() => this.controller.saveSheet()}>
			提交
		</button>;
	}
	content() {
		let {mid, master, details} = this.controller;
		let {ID} = mid.MasterIDs;
		let right = <button className="btn btn-success btn-sm"
			onClick={() => this.controller.editDetail(undefined)}>
			<FA name="plus" />
		</button>;
		return <div className="my-3">
			<div className="p-3">
				{ID.render(master)}
			</div>
			<div className="mt-3 pb-1 mb-1 px-3 small text-muted border-bottom">
				<LMR right={right}>明细</LMR>
			</div>
			<List items={details} item={{render: this.renderDetail, onClick: this.onDetailClick}} />
		</div>;
	}

	private onDetailClick = (item: any) => {
		this.controller.editDetail(item);
	}

	private renderDetail = (item:any, index:number) => {
		return <div className="px-3 py-2">
			{JSON.stringify(item)}
		</div>
	}
}
