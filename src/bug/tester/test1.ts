import { DebugItem } from "bug/CBug";
import { UQs } from "UqApp";
import { Log } from "../Logger";

export const testItem1:DebugItem = {
	name: 'HelloTonva.GetProductStock',
	discription: '{product: 1}',
	test: async ( log: Log, uqs: UQs):Promise<void> => {
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