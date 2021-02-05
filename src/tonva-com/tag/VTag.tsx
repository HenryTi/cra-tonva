import { VPage } from "tonva-react";
import { CTag } from "./CTag";
import { Example, Tag } from "./Tag";

export class VTag extends VPage<CTag> {
	header() {return 'tag'}
	content() {
		let id = 1;
		return <div className="p-3">
			tag
			<Tag qTag={this.controller.com} id={id} onClick={() => this.controller.editTag(id)} />
			<Example />
		</div>
	}
}
