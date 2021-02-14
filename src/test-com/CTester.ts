import { CBase } from "tonva-react";
import { CApp, UQs } from "UqApp";
import { VTester } from "./VTester";
import { CID, MidID, CIDX, MidIDX, MidTag, CIDTagList } from "tonva-com";
import {  } from "tonva-com";
import { CTagIDList } from "tonva-com/tag/CTagIDList";

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
				let midTag = new MidTag(uq, uq.Customer, uq.CustomerTag, uq.Tag, 'customer');
				let cIDTagList = new CIDTagList({midTag});
				await cIDTagList.start();
			}
		},
		{
			name: 'tagCustomer',
			discription: '标签客户',
			click: async () => {
				let uq = this.uqs.BzHelloTonva;
				let midTag = new MidTag(uq, uq.Customer, uq.CustomerTag, uq.Tag, 'customer');
				let cTagIDList = new CTagIDList(midTag);
				await cTagIDList.start();
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
