import { UqOptions } from 'tonva-react';

const uqAppName = 'BizDev/hello-tonva';

export const uqOptions: UqOptions = {
	/*
	app: {
		name: uqAppName,
		version: '1.0.0',
		ownerMap: {
			//bizdev: 'bz'
		},
	},
	*/
	uqs: {
		bizdev: {
			$: 'bz', 					// 指定名称前缀
			'hello-tonva': '0.1.0',
			'customer-payment': '0.1.0',
			'test': '0.1.0',
		},
	},
	//version: '0.1.0',
	noUnit: true,
    tvs: {},
	oem: undefined as any,
	htmlTitle: '同花-hello',
};
