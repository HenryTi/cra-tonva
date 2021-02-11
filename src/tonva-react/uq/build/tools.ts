import fs from 'fs';
import { capitalCase } from "../../tool";
import { UqMan } from "../uqMan";

export const red = '\x1b[41m%s\x1b[0m';
export let lastBuildTime:number = 0;
export const uqTsSrcPath = 'src/UqApp';

export function saveSrcTsFileIfNotExists(fileName:string, content:string, suffix:string = 'ts') {
	//let tsFile = `${uqTsSrcPath}/${fileName}.${suffix}`;
	saveTsFileIfNotExists(uqTsSrcPath, fileName, content, suffix);
	//if (fs.existsSync(tsFile) === true) return;
	//saveTsFile(fileName, content, suffix);
}
export function saveTsFile(fileName:string, content:string, suffix:string = 'ts') {
	let srcFile = `${uqTsSrcPath}/${fileName}.${suffix}.txt`;
	let tsFile = `${uqTsSrcPath}/${fileName}.${suffix}`;
	if (!fs.existsSync(srcFile)) {
		if (fs.existsSync(tsFile)) {
			fs.renameSync(tsFile, srcFile);
		}
	}
	fs.writeFileSync(tsFile, content);
	lastBuildTime = Date.now();
	console.log(red, `${tsFile} is built`);
}
export function overrideTsFile(path:string, fileName:string, content:string, suffix:string = 'ts') {
	let tsFile = `${path}/${fileName}.${suffix}`;
	fs.writeFileSync(tsFile, content);
	lastBuildTime = Date.now();
	console.log(red, `${tsFile} is built`);
}
export function saveTsFileIfNotExists(path:string, fileName:string, content:string, suffix:string = 'ts') {
	let tsFile = `${path}/${fileName}.${suffix}`;
	if (fs.existsSync(tsFile) === true) return;
	overrideTsFile(path, fileName, content, suffix);
}

/*
function createTsFile(path:string, fileName:string, content:string, suffix:string = 'ts') {
	let tsFile = `${path}/${fileName}.${suffix}`;
	if (fs.existsSync(tsFile) === true) return;
	fs.writeFileSync(tsFile, content);
	lastBuildTime = Date.now();
	console.log(red, `${tsFile} is built`);
}
*/
export function buildTsHeader() {
	return `//=== UqApp builder created on ${new Date()} ===//`;
}

export function entityName(s:string):string {
	return capitalCase(s);
}

export function getNameFromUq(uqMan:UqMan):{devName:string; uqName:string} {
	let {config} = uqMan;
	let devPart:string, uqPart:string;
	if (config) {
		let {dev, name, alias} = config;
		let {name:devName, alias:devAlias} = dev;
		devPart = devAlias || devName;
		uqPart = alias || name;
	}
	else {
		let {uqOwner, uqName} = uqMan;
		devPart = uqOwner;
		uqPart = uqName;
	}
	return {
		devName: capitalCase(devPart),
		uqName: capitalCase(uqPart),
	};
}
