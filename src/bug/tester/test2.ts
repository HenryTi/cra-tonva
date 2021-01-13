import { UQs } from "UqApp";
import { Log } from "../Logger";

export const testItem2 = {
	name: '第二测试', 
	discription: 'second test', 
	test: async (log: Log, uqs: UQs):Promise<void> => {
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
