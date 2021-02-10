import { FA, PropGrid, VPage } from "tonva-react";
import { CID } from "./CID";

export class VView extends VPage<CID> {
	header() {return 'View'}
	right() {
		return <button
			className="btn btn-sm btn-primary mr-2" 
			onClick={() => this.controller.onItemEdit()}>
			<FA name="pencil-square-o" />
		</button>;
	}
	content() {
		let {item, mid: com} = this.controller;
		let {props} = com;
		return <div className="py-3">
			<PropGrid rows={props}
				values={item} />
		</div>
	}
}
