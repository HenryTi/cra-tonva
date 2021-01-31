import { UQs } from "UqApp";
import { Log } from "../Logger";

export const testItem3 = {
	name: '第三测试', 
	discription: 'third test', 
	test: async (log: Log, uqs: UQs):Promise<void> => {
		let a = await uqs.BzTest.IDLog({
			IDX: 'ibook1',
			field: 'f2',
			id: 7,
			log: 'each',
			page: {start:undefined, size: 50},
		});
		log(a);

		let b = await uqs.BzTest.KeyID({
			ID: 'x1',
			key: {a1: 1, a2: undefined},
		});
		log(b);

		let c = await uqs.BzTest.ID2({
			ID2: 'assign1',
			id: 3,
		});
		log(c);

		let d = await uqs.BzTest.KeyID2({
			ID: 'x1',
			key: {a1: 1, a2: undefined},
			ID2: 'assign1',
		});
		log(d);

		let e = await uqs.BzTest.IDActs({
			iBook1: [
				{id: -7, f1: 3.5, f2: 7.2, b: 'bbbb', c: 1},
			]
		});
		log(e);

		let ret = await uqs.BzHelloTonva.TestArr.submitReturns({rows: [
			{a: 1, b: 2}, 
			{a: 3, b: 4}, 
		]});
		log(ret);
		log('test2 - ddd ');
		log('test2 - ddd ');
		log('test2 - ddd ');
		log('test2 - ddd ');
		log('test2 - ddd ');
		log('test2 - ddd ');
		log('test2 - ddd ');
		log('test2 - ddd ');
	}
}
