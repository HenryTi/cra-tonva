import { CBase, Context } from "tonva-react";
import { CID, MidID, CIDX, MidIDX, MidTag, CIDTagList, CTagIDList, SheetOptions, MidIDTagList } from "tonva-uqui";
import { CSheetNew, MidSheet } from "tonva-uqui";
import { CApp, UQs } from "UqApp";
import { OrderDetail, OrderMaster } from "UqApp/uqs/BzHelloTonva";
import { VTester } from "./VTester";
import { isNumber } from "lodash";

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
				let midIDTagList = new MidIDTagList(midTag);
				let cIDTagList = new CIDTagList(midIDTagList);
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
		{
			name: 'sheet-order',
			discription: 'Sheet Order Hello Tonva',
			click: async () => {
				let uq = this.uqs.BzHelloTonva;
				let onChanged = async (context:Context, value:any, prev:any) => {
					let quantity = context.getValue('quantity');
					let price = context.getValue('price');
					if (isNumber(quantity) && isNumber(value)) {
						context.setValue('amount', (price*quantity).toFixed(2));
					}
				}
				let sheetOptions:SheetOptions = {
					master: {
						ID: uq.OrderMaster,
						fields: {
							customer: {ID: uq.Customer},
						}
					},
					detail: {
						ID: uq.OrderDetail,
						fields: {
							product: { ID: uq.Customer },
							price: { onChanged },
							quantity: { onChanged },
							amount: { readOnly: true, }
						}
					}
				}
				let mid = new MidSheet<OrderMaster, OrderDetail>(uq, this.res, sheetOptions);
				let cSheetNew = new CSheetNew(mid);
				await cSheetNew.start();
			}
		},
	];

	protected async internalStart() {
	}

	tab = () => this.renderView(VTester);
}
