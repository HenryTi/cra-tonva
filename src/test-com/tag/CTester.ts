import { CTag } from "tonva-com/tag";
import { CBase } from "tonva-react";
import { CApp, UQs } from "UqApp";
import { VTester } from "./VTester";

export interface UIItem {
	name: string;
	discription?: string;
	click: () => Promise<void>;
}

export class CTester extends CBase<CApp,UQs> {
	readonly uiItems:UIItem[] = [
		{name: 'tag',  discription: '标签管理', click: () => (new CTag(this.uqs.BzTest.coms.customer)).start()},
	];
		
	protected async internalStart() {
	}

	tab = () => this.renderView(VTester);
}
