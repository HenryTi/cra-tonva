import { build } from 'tonva-react';
import { appConfig } from './appConfig';

test('build UqApp', async () => {
	await build(appConfig);
	let a = 1;
	console.log(a);
}, 600*1000);
