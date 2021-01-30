import { DebugItem } from "bug/CBug";
import { UQsMan } from "tonva-react";
import { BzTest, BzHelloTonva, BzCustomerPayment, UQs } from "UqApp";
import { Log } from "../Logger";

export const testItem1:DebugItem = {
	name: 'HelloTonva.GetProductStock',
	discription: '{product: 1}',
	test: async ( log: Log, uqs: UQs):Promise<void> => {
		
		let a = await uqs.BzTest.ID({
			IDX: 'x1',
			id: 7077888,
		});
		for (let item of a) {
			log(item);
		}

		let e = await uqs.BzTest.IDActs({
			tag: [
				{type: 'a', name: 'b'},
				{type: 'a', name: 'c'},
				{type: 'd', name: 'c'},
			],
			x1: [
				{a1: 1, a2: 3, a3:5, n5: 7},
				{a1: 1, a2: 7, a3:51, n5: 71},
			],
			assign1: [
				{id: 3, id2: 5, val: 3},
				{id: 3, id2: 6, val: 30},
			],
			iBook1: [
				{id: 7, f1: 3.5, f2: 7.2, b: 'bbbb', c: 1},
				{id: 8, f1: 3.5, f2: 7.2, b: 'bbbbc', c: 2},
			],
		});
		log(e);

		let b = await uqs.BzTest.IDDetail<BzTest.OrderMaster, BzTest.OrderDetail>
		({
			master: {
				name: 'OrderMaster',
				value: {customer: 1 },
			},
			detail: {
				name: 'OrderDetail',
				values: [
					{product:11, price:2.0, quantity:3.0, amount:6.0},
					{product:12, price:2.0, quantity:5.0, amount:10.0},
				]
			}
		});

		log(b);

		let c = await uqs.BzTest.IDDetailGet<BzTest.OrderMaster, BzTest.OrderDetail>({
			id: 8716325,
			master: 'OrderMaster',
			detail: 'OrderDetail',
		});

		for (let ci of c) {
			log(ci);
		}

		//let u: BzHelloTonva.Return$pokedRet;
		//u.poke = 1;
		let f = BzCustomerPayment.EnumCustomerAction.confirm;

		let ret = await uqs.BzHelloTonva.GetProductStock.query({product: 1});
		log(ret);
		log('test1');
		log('test1');
		log('test1');
		log('test1');
		log('test1');
		log('test1');
		log('test1');
		log('test1');
	}
}