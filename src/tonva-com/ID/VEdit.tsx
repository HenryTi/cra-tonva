import { Context, Form, VPage } from "tonva-react";
import { CID } from "./CID";

export class VEdit extends VPage<CID<any>> {
	header() {return 'Edit'}
	content() {
		let {item, mid} = this.controller;
		return <div className="p-3">
			<Form fieldLabelSize={2} formData={item}
				schema={mid.itemSchema}
				uiSchema={mid.uiSchema}
				onButtonClick={this.onSubmit} />
		</div>
	}
	private onSubmit = async (name:string, context: Context) => {
		await this.controller.saveID(context.data);
		this.closePage();
	}
}
