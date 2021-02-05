//=== UqApp builder created on Tue Jan 12 2021 23:14:51 GMT-0500 (GMT-05:00) ===//
import { AppConfig, DevConfig } from "tonva-react";

const bz: DevConfig = {
	name: 'bizdev',
	alias: 'bz',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jk: DevConfig = {
	name: '百灵威系统工程部',
	alias: 'jk',
}

/*
"bizdev": {
	"$": "bz",
	"hello-tonva": "0.1.0",
	"customer-payment": "0.1.0",
	"test": "0.1.0",
},
*/

export const appConfig: AppConfig = {
	app: undefined,
	uqs: [
		{
			dev: bz,
			name: 'hello-tonva',
			alias: 'HelloTonva',
			version: '0.1.0',
		},
		{
			dev: bz,
			name: 'customer-payment',
			alias: 'CustomerPayment',
			version: '0.1.0',
		},
		{
			dev: bz,
			name: 'test',
			alias: 'Test',
			version: '0.1.0',
		},
		{
			dev: bz,
			name: 'TimesChange',
			alias: 'TimesChange',
			version: '0.1.0',
		},
	],
	noUnit: true,
    tvs: {},
	oem: undefined,
	htmlTitle: '同花-hello',
};
