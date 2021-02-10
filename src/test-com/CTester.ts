import { CBase } from "tonva-react";
import { CApp, UQs } from "UqApp";
import { VTester } from "./VTester";
import { CID, MidID, CIDX, MidIDX, MidTag, CTag } from "tonva-com";

export interface UIItem {
	name: string;
	discription?: string;
	click: () => Promise<void>;
}

export class CTester extends CBase<CApp,UQs> {
	private readonly clickTag = async () => {
		let uq = this.uqs.BzTest;
		let com = new MidTag(uq, uq.Customer, uq.CustomerTag, uq.Tag);
		let cTag = new CTag(com);
		await cTag.start();
	}

	private readonly clickStaff = async () => {
		let uq = this.uqs.BzTimesChange;
		let com = new MidID(uq, uq.Staff);
		let cStaff = new CID(com);
		await cStaff.start();
	}

	private readonly clickHours = async () => {
		let uq = this.uqs.BzTimesChange;
		let com = new MidIDX(uq, uq.Hours, uq.Staff);
		let cHours = new CIDX(com);
		await cHours.start();
	}

	readonly uiItems:UIItem[] = [
		{name: 'tag',  discription: '客户标签管理', click: this.clickTag },
		{name: 'staff',  discription: 'TimeChange Staff', click: this.clickStaff},
		{name: 'hours',  discription: 'TimeChange Hours', click: this.clickHours},
	];
		
	protected async internalStart() {
	}

	tab = () => this.renderView(VTester);
}
