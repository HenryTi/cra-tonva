import { UiForm } from "tonva-com";
import { Detail, Master } from "../base";
import { CDialog, createPickId } from "../form";
import { CSheet } from "./CSheet";
import { VSheetEdit } from "./VSheetEdit";

export class CSheetNew<M extends Master, D extends Detail> extends CSheet<M, D> {
	protected async internalStart() {
		let {uq, MasterIDs} = this.mid;
		let {ID, FieldNO, FieldIDs} = MasterIDs;
		let uiDialog = new UiForm(ID.ui);
		if (FieldNO) {
			let no = await this.mid.uq.IDNO({ID});
			uiDialog.setNO(no, FieldNO);
		}
		if (FieldIDs) {
			for (let i in FieldIDs) {
				let FieldID = FieldIDs[i];
				uiDialog.setIDUi(i, createPickId(uq, FieldID), FieldID.render);
			}
		}
		let cDialog = new CDialog(uiDialog);
		let master = await cDialog.call<M>();
		if (master === null) return;
		this.master = master;
		this.openVPage(VSheetEdit);
	}
}
