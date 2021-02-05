import { VPage } from "tonva-react";
import { CTag } from "./CTag";
import { Tag } from "./Tag";

export class VTagEdit extends VPage<CTag> {
	private id: number;
	init(param:any) {
		this.id = param;
	}

	header() {return 'Tag Edit'}
	content() {
		return <div className="p-3">
			Tag Edit
			<Tag qTag={this.controller.com} id={this.id} />
		</div>
	}
}