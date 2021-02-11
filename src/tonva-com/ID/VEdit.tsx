import { Context, Form, VPage } from "tonva-react";
import { CID } from "./CID";

export class VEdit extends VPage<CID> {
	header() {return 'Edit'}
	content() {
		let {item, mid: com} = this.controller;
		return <div className="p-3">
			<Form fieldLabelSize={2} formData={item}
				schema={com.itemSchema}
				uiSchema={com.uiSchema}
				onButtonClick={this.onSubmit} />
		</div>
	}
	private onSubmit = async (name:string, context: Context) => {
		await this.controller.saveID(context.data);
		this.closePage();
	}
}
