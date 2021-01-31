import { CTag } from "com/tag";
import { CAppBase, CBase } from "tonva-react";
import { VTester } from "./VTester";

export interface UIItem {
	name: string;
	discription?: string;
	click: () => Promise<void>;
}

export class CTester<A extends CAppBase<U>, U> extends CBase<A,U> {
	readonly uiItems:UIItem[] = [
		{name: 'tag',  discription: '标签管理', click: () => this.newC(CTag).start()},
	];
		
	protected async internalStart() {
	}

	tab = () => this.renderView(VTester);
}
