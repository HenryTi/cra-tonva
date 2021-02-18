import { VPage } from "tonva-react";
import { CSheet } from "./CSheet";

export class VSheetView extends VPage<CSheet<any, any>> {
	header() {return this.controller.mid.MasterIDs.ID.ui.label}
	content() {
		let {mid, master, details} = this.controller;
		let {ID} = mid.MasterIDs;
		return <div className="p-3">
			{ID.render(master)}
		</div>;
	}
}