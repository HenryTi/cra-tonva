import { buildUqs } from 'tonva-react';
import { uqOptions } from './uqOptions';

test('build UqApp', async () => {
	await buildUqs(uqOptions);
	let a = 1;
	console.log(a);
}, 600*1000);
