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
	readonly uiItems:UIItem[] = [
		{
			name: 'customer',
			discription: '客户信息',
			click: async () => {
				let uq = this.uqs.BzHelloTonva;
				let mid = new MidID(uq, uq.Customer);
				let cID = new CID(mid);
				await cID.start();
			}
		},
		{
			name: 'tag',
			discription: '客户标签',
			click: async () => {
				let uq = this.uqs.BzHelloTonva;
				let mid = new MidTag(uq, uq.Customer, uq.CustomerTag, uq.Tag, 'customer');
				let cTag = new CTag(mid);
				await cTag.start();
			}
		},
		{
			name: 'staff',
			discription: 'TimeChange Staff',
			click: async () => {
				let uq = this.uqs.BzTimesChange;
				let mid = new MidID(uq, uq.Staff);
				let cStaff = new CID(mid);
				await cStaff.start();
			}
		},
		{
			name: 'hours',
			discription: 'TimeChange Hours',
			click: async () => {
				let uq = this.uqs.BzTimesChange;
				let mid = new MidIDX(uq, uq.Hours, uq.Staff);
				let cHours = new CIDX(mid);
				await cHours.start();
			}
		},
	];

	protected async internalStart() {
	}

	tab = () => this.renderView(VTester);
}
