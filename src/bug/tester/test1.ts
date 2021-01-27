import { DebugItem } from "bug/CBug";
import { BzTest, BzHelloTonva, BzCustomerPayment, BzCustomerpayment_EnumCustomerAction, UQs } from "UqApp";
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
		//let u: BzHelloTonva.Return$pokedRet;
		//u.poke = 1;
		let f = BzCustomerpayment_EnumCustomerAction.confirm;

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