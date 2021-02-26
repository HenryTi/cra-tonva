import { VPage } from "tonva-react";
import { CSheet } from "./CSheet";

export class VSheetView extends VPage<CSheet<any, any>> {
	header() {return this.controller.mid.master.ID.ui.label}
	content() {
		let {mid, master, details} = this.controller;
		let {ID} = mid.master;
		return <div className="p-3">
			{ID.render(master)}
		</div>;
	}
}