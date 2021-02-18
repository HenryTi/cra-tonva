import { makeObservable, observable } from "mobx";
import { CForm, createPickId, UiForm } from "tonva-com/form";
import { Controller } from "tonva-react";
import { Detail, Master } from "../base";
import { MidSheet } from "./MidSheet";

export abstract class CSheet<M extends Master, D extends Detail> extends Controller {
	readonly mid: MidSheet<M, D>;
	id: number;
	master: M;
	details: D[] = [];
	detail: D;

	constructor(mid: MidSheet<M, D>) {
		super(mid.res);
		this.mid = mid;
		makeObservable(this, {
			master: observable,
			details: observable,
		});
	}

	protected async load(id:number) {
		this.id = id;
		let [master, details] = await this.mid.load(id);
		this.master = master[0];
		this.details = details;
	}

	async saveSheet() {
		this.closePage();
	}
	
	afterMasterNew() {

	}

	editDetail = async (detail: D) => {
		let {uq, DetailIDs} = this.mid;
		let {ID, FieldIDs} = DetailIDs;
		let uiForm = new UiForm(ID.ui);
		if (FieldIDs) {
			for (let i in FieldIDs) {
				let FieldID = FieldIDs[i];
				uiForm.setIDUi(i, createPickId(uq, FieldID), FieldID.render);
			}
		}
		uiForm.onSubmit = async (values) => {
			this.details.push(values);
			this.closePage();
			if (detail === undefined) {
				let cForm = new CForm(uiForm);
				await cForm.start(detail);
			}
		}
		let cForm = new CForm(uiForm);
		await cForm.start(detail);
	}
}
