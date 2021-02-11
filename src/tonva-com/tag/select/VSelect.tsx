import { VPage } from "tonva-react";
import { CSelect } from "./CSelect";
import { Tag } from '../Mid';

export class VSelect extends VPage<CSelect> {
	header() {return 'select'}
	content() {
		let {midTag} = this.controller;
		let {tags} = midTag;
		return <div className="px-3">
			{tags.map(v => this.renderType(v))}
		</div>;
	}

	private renderType(tag: Tag) {
		let {id, name, sub}  = tag;
		return <div key={id} className="my-3">
			<div><b>{name}</b></div>
			{sub.map(v => {
				let {id, name} = v;
				return <label key={id} className="my-2 mr-4">
					<input type="checkbox" className="mr-2"
						onChange={(evt) => this.controller.onTagSelectChanged(id, evt.currentTarget.checked)} />
					{name}
				</label>
			})}
		</div>
	}
}