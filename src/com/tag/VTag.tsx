import { VPage } from "tonva-react";
import { CTag } from "./CTag";
import { Example, Tag, TagUQs } from "./Tag";

export class VTag extends VPage<CTag<any,any>> {
	header() {return 'tag'}
	content() {
		let tagUQs = new TagUQs(this.controller.uqs, 'Tag', 'CustomerTag');
		return <div className="p-3">
			tag
			<Tag tagUQs={tagUQs} id={1} />
			<Example />
		</div>
	}
}
