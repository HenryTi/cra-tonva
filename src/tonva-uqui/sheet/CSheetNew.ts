import { FormProps } from "tonva-uqui";
import { Detail, Master } from "../base";
import { CDialog, createPickId } from "../form";
import { CSheet } from "./CSheet";
import { VSheetEdit } from "./VSheetEdit";

export class CSheetNew<M extends Master, D extends Detail> extends CSheet<M, D> {
	protected async internalStart() {
		let {uq, master:masterFormUI} = this.mid;
		let {ID, fields} = masterFormUI;
		let formProps = new FormProps(ID.ui, fields);
		if (formProps.fields['no']) {
			let no = await this.mid.uq.IDNO({ID});
			formProps.setNO(no, 'no');
		}
		if (fields) {
			for (let i in fields) {
				let field = fields[i];
				let {ID} = field;
				if (ID) {
					formProps.setIDUi(i, createPickId(uq, ID), ID.render);
				}
			}
		}
		let cDialog = new CDialog(formProps);
		let master = await cDialog.call<M>();
		if (master === null) return;
		this.master = master;
		this.openVPage(VSheetEdit);
	}
}
