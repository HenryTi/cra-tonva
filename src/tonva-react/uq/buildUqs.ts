import fs from 'fs';
import path from 'path';
import { Action, Book, Query, Sheet, Tuid, UqEnum, 
	UqMan, UQsMan, Map, History, Tag, Pending, 
	Entity, ArrFields, Field } from './index';
import { nav } from '../components';
import { UqsConfig } from '../app';
import { ID, ID2, IDX } from './ID';
import { camelCase, capitalCase, env } from 'tonva-react/tool';

const red = '\x1b[41m%s\x1b[0m';
let lastBuildTime:number = 0;
//let gUqOwnerMap:{[key:string]:string};
const uqTsSrcPath = 'src/UqApp';

/*
export interface UqOptions extends Partial<AppConfig> {
	app?: {
		name: string;
		version: string;
		ownerMap?: {[key:string]: string};
	}
	uqs?: {
		[owner:string]: {[name:string]:string}; // name: version
	};
}
*/

// 返回每个uq构建时的错误
async function uqsStart(uqsConfig: UqsConfig):Promise<string[]> {
	//let {app, uqs} = uqsConfig;
	//process.env.REACT_APP_UNIT = String(appUnitId);
	nav.forceDevelopment = true;
	await nav.init();
	let retErrors = await UQsMan.build(uqsConfig);
//	gUqOwnerMap = UQsMan.uqOwnerMap;
	return retErrors;
	/*
	if (app) {
		let {name, version, ownerMap} = app;
		gUqOwnerMap = ownerMap || {};
		for (let i in gUqOwnerMap) {
			gUqOwnerMap[i.toLowerCase()] = gUqOwnerMap[i];
		}
		return await UQsMan.load(name, version, tvs);
	}
	else if (uqs) {
		let uqNames:{owner:string; name:string; version:string}[] = [];
		gUqOwnerMap = {};
		for (let owner in uqs) {
			let ownerObj = uqs[owner];
			for (let name in ownerObj) {
				let v = ownerObj[name];
				switch (name) {
					case '$':
						gUqOwnerMap[owner.toLowerCase()] = v;
						break;
					default:
						uqNames.push({owner, name, version:v});
						break;
				}
			}
		}
		if (uqNames.length > 0) {
			return await UQsMan.loadUqs(uqNames, tvs);
		}
	}
	*/
	throw new Error('uqOptions must either app or uqs');
}
export async function buildUqs(options: UqsConfig) {
	// 只从test 数据库构建uq ts
	env.testing = true;

	if (lastBuildTime > 0) {
		console.log(red, 'quit !');
		return;
	}
	if (!fs.existsSync(uqTsSrcPath)) {
		fs.mkdirSync(uqTsSrcPath);
	}
	//buildTsAppName(options);
	//buildTsAppConfig(options);
	
	let tsIndex = buildTsIndex();
	saveTsFile('index', tsIndex);
	let tsCApp = buildTsCApp();
	saveTsFileIfNotExists('CApp', tsCApp);
	let tsCBase = buildTsCBase();
	saveTsFile('CBase', tsCBase);
	let tsVMain = buildTsVMain();
	saveTsFileIfNotExists('VMain', tsVMain, 'tsx');

	saveTsFile('uqs', '');
	fs.unlinkSync(uqTsSrcPath + '/uqs.ts');
	await buildUqsFolder(uqTsSrcPath + '/uqs', options);
};

function saveTsFileIfNotExists(fileName:string, content:string, suffix:string = 'ts') {
	let tsFile = `${uqTsSrcPath}/${fileName}.${suffix}`;
	if (fs.existsSync(tsFile) === true) return;
	saveTsFile(fileName, content, suffix);
}
function saveTsFile(fileName:string, content:string, suffix:string = 'ts') {
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
function overrideTsFile(path:string, fileName:string, content:string, suffix:string = 'ts') {
	let tsFile = `${path}/${fileName}.${suffix}`;
	fs.writeFileSync(tsFile, content);
	lastBuildTime = Date.now();
	console.log(red, `${tsFile} is built`);
}
function buildTsHeader() {
	return `//=== UqApp builder created on ${new Date()} ===//`;
}
/*
function buildTsAppName(options: UqsConfig):void {
	let {app} = options;
	if (app) {
		let tsAppName = `${buildTsHeader()}
export const appName = '${app.name}';
`;
		saveTsFile('appName', tsAppName);
	}
}
function buildTsAppConfig(options: UqsConfig):void {
	let {app, uqs, noUnit, tvs, oem, htmlTitle} = options;
	function toString(s:string) {
		if (s === undefined) return;
		if (s === null) return null;
		return `'${s}'`;
	}
	function toAppString():string {
		if (!app) return undefined;
		let {name, version} = app;
		return `{ name: ${name}, version: ${version} }`;
	}
	function toUqsString(): string {
		if (!uqs) return undefined;
		let ret = '{\n';
		for (let owner in uqs) {
			ret += `\t\t"${owner}": {\n`;
			let ownerObj = uqs[owner];
			for (let name in ownerObj) {
				ret += `\t\t\t"${name}": "${ownerObj[name]}",\n`;
			}
			ret += `\t\t},\n`
		}
		return ret + '\t}';
	}
	let ts = `${buildTsHeader()}
import { AppConfig } from "tonva-react";

export const appConfig: AppConfig = {
	app: ${toAppString()},
	uqs: ${toUqsString()},
	noUnit: ${noUnit},
    tvs: ${JSON.stringify(tvs)},
	oem: ${toString(oem)},
	htmlTitle: ${toString(htmlTitle)},
};
`;
	saveTsFile('appConfig', ts);
}
export { appConfig } from './appConfig';
*/

function buildTsIndex():string {
	return `${buildTsHeader()}
export { CUqApp, CUqBase, CUqSub } from './CBase';
export { CApp } from './CApp';
export * from './uqs';
`;
}
function buildTsCApp():string {
	return `${buildTsHeader()}
import { CUqApp } from "./CBase";
import { VMain } from "./VMain";

export class CApp extends CUqApp {
	protected async internalStart(isUserLogin: boolean) {
		this.openVPage(VMain, undefined, this.dispose);
	}
}
`;
}
function buildTsCBase():string {
	return `${buildTsHeader()}
import { CSub, CBase, CAppBase, IConstructor } from 'tonva-react';
import { UQs } from './uqs';
import { CApp } from './CApp';

export abstract class CUqBase extends CBase {
	get cApp(): CApp { return this._cApp; }
	protected get uqs(): UQs { return this._uqs as UQs };
}

export abstract class CUqSub<T extends CUqBase> extends CSub<T> {
	get cApp(): CApp { return this._cApp; }
	protected get uqs(): UQs { return this._uqs as UQs };
	get owner(): T { return this._owner as T }
}

export abstract class CUqApp extends CAppBase {
	get uqs(): UQs { return this._uqs };

	protected newC<T extends CUqBase>(type: IConstructor<T>): T {
		let c = new type(this);
		c.init();
		return c;
	}
}
`;
}
function buildTsVMain() {
	return `${buildTsHeader()}
import { VPage, Page } from 'tonva-react';
import { CApp } from './CApp';

export class VMain extends VPage<CApp> {
	async open(param?: any, onClosePage?: (ret:any)=>void) {
		this.openPage(this.render, param, onClosePage);
	}

	render = (param?: any): JSX.Element => {
		return <Page header="TEST">
			<div className="m-3">
				<div>{this.renderMe()}</div>
				<div className="mb-5">同花样例主页面</div>
			</div>
		</Page>;
	}
}
`;
}

async function buildUqsFolder(uqsFolder:string, options: UqsConfig) {
	let uqErrors = await uqsStart(options);

	let uqsMan = UQsMan.value;
	let uqMans = uqsMan.getUqMans();
	
	let promiseArr:Promise<void>[] = [];
	/*
	let uqs:UqMan[] = [];
	for (let i in coll) {
		let lowerI = i.toLowerCase();
		if (lowerI !== i) continue;
		uqs.push(coll[i]);
	}
	*/
	
	if (uqErrors) {
		//let error = options.uqAppName + ' not defined!';
		throw new Error(uqErrors.join('\n'));
	}

	for (let uq of uqMans) {
		promiseArr.push(loadUqEntities(uq));
	}
	await Promise.all(promiseArr);

	if (!fs.existsSync(uqsFolder)) {
		fs.mkdirSync(uqsFolder);
	}
	else {
		try {
			let files = fs.readdirSync(uqsFolder);
			for (const file of files) {
				fs.unlinkSync(path.join(uqsFolder, file));
			}	
		}
		catch (err) {
			throw err;
		}
	}
	let tsUqsIndexHeader = buildTsHeader();
	let tsUqsIndexContent = `\n\nexport interface UQs {`;
	//let tsUqsExports = '\n\n';
	let tsUqsIndexReExport = '\n';
	for (let uq of uqMans) {
		//let {enumArr} = uq;
		//let {uqOwner, uqName, enumArr} = uq;
		//let o1 = getUqOwnerName(uqOwner);
		//let n1 = getUqName(uqName);
		let {devName:o1, uqName:n1} = getNameFromUq(uq);
		let uqAlias = o1 + n1;
		let tsUq = buildTsUq(uq);
		overrideTsFile(uqsFolder, o1+n1, tsUq);
		// as ${o1}${n1}
		tsUqsIndexHeader += `\nimport { ${uqAlias} } from './${uqAlias}';`;
		tsUqsIndexContent += `\n\t${uqAlias}: ${uqAlias}.Uq;`; //${o1}${n1};`;
		tsUqsIndexReExport += `\nexport * from './${uqAlias}';`;

		/*
		if (enumArr.length > 0) {
			tsUqsExports += `\nexport {`; 
			for (let enm of uq.enumArr) {
				let enmName = `${capitalCaseString(enm.sName)}`;
				tsUqsExports += `\n\t${enmName} as ${o1}${n1}${enmName},`;
			}
			tsUqsExports += `\n} from './${o1}${n1}';`;
		}
		*/
	}

	overrideTsFile(uqsFolder, 'index', 
		tsUqsIndexHeader + tsUqsIndexContent + '\n}' + tsUqsIndexReExport + '\n');
}

function buildTsUq(uq: UqMan) {
	let ret = buildTsHeader();
	ret += buildUQ(uq);
	return ret;
}

function entityName(s:string):string {
	return capitalCase(s);
}
/*
function getUqOwnerName(uqOwner:string) {
	let uo = gUqOwnerMap[uqOwner.toLowerCase()];
	if (uo === undefined) return '';
	if (uo.length === 0) return '';
	return capitalCaseString(uo);
}
*/
function getNameFromUq(uqMan:UqMan):{devName:string; uqName:string} {
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

function uqBlock<T extends Entity>(entity: T, build: (entity: T)=>string) {
	let {name} = entity;
	if (name.indexOf('$') > 0) return '';
	let entityCode = build(entity);
	if (!entityCode) return '';
	return '\n' + entityCode;
}

function uqEntityInterface<T extends Entity>(entity: T, buildInterface: (entity: T)=>string) {
	let {name} = entity;
	if (name.indexOf('$') > 0) return '';
	let entityCode = buildInterface(entity);
	if (!entityCode) return '';
	return '\n' + entityCode + '\n';
}

async function loadUqEntities(uq:UqMan):Promise<void> {
	await uq.loadAllSchemas();
	/*
	let arr: Promise<any>[] = [];
    uq.actionArr.forEach(v => arr.push(v.loadSchema()));
    uq.enumArr.forEach(v => arr.push(v.loadSchema()));
    uq.sheetArr.forEach(v => arr.push(v.loadSchema()));
    uq.queryArr.forEach(v => arr.push(v.loadSchema()));
    uq.bookArr.forEach(v => arr.push(v.loadSchema()));
    uq.mapArr.forEach(v => arr.push(v.loadSchema()));
    uq.historyArr.forEach(v => arr.push(v.loadSchema()));
    uq.pendingArr.forEach(v => arr.push(v.loadSchema()));
	uq.tagArr.forEach(v => arr.push(v.loadSchema()));
	await Promise.all(arr);
	*/
}

function buildUQ(uq:UqMan) {
	//let {uqOwner, uqName} = uq;
	let tsImport = '\nimport { UqBase';
	//UqTuid, UqQuery, UqAction, UqSheet/*, Map, Tag*/
	let ts:string = `\n\n`;
	ts += '\n//===============================';
	ts += `\n//======= UQ ${uq.name} ========`;
	ts += '\n//===============================';
	ts += '\n';
	
	let {devName, uqName} = getNameFromUq(uq);

	uq.enumArr.forEach(v => ts += uqEntityInterface<UqEnum>(v, buildEnumInterface));

	ts += `\nexport declare namespace ${devName}${uqName} {`;
	uq.tuidArr.forEach(v => ts += uqEntityInterface<Tuid>(v, buildTuidInterface));
    uq.actionArr.forEach(v => ts += uqEntityInterface<Action>(v, buildActionInterface));
    uq.sheetArr.forEach(v => ts += uqEntityInterface<Sheet>(v, buildSheetInterface));
    uq.queryArr.forEach(v => ts += uqEntityInterface<Query>(v, buildQueryInterface));
    uq.bookArr.forEach(v => ts += uqEntityInterface<Book>(v, buildBookInterface));
    uq.mapArr.forEach(v => ts += uqEntityInterface<Map>(v, buildMapInterface));
    uq.historyArr.forEach(v => ts += uqEntityInterface<History>(v, buildHistoryInterface));
    uq.pendingArr.forEach(v => ts += uqEntityInterface<Pending>(v, buildPendingInterface));
	uq.tagArr.forEach(v => ts += uqEntityInterface<Tag>(v, buildTagInterface));
	uq.idArr.forEach(v => ts += uqEntityInterface<ID>(v, buildIDInterface));
	uq.idxArr.forEach(v => ts += uqEntityInterface<IDX>(v, buildIDXInterface));
	uq.id2Arr.forEach(v => ts += uqEntityInterface<ID2>(v, buildID2Interface));

	ts += buildIDActInterface(uq);

	ts += `\n\nexport interface Uq extends UqBase<ParamIDActs> {`;
	function appendArr<T extends Entity>(arr:T[], type:string, tsBuild: (v:T) => string) {
		if (arr.length === 0) return;
		let tsLen = ts.length;
		arr.forEach(v => ts += tsBuild(v));
		if (ts.length - tsLen > 0) {
			tsImport += ', Uq' + type;
		}
	}
	appendArr<Tuid>(uq.tuidArr, 'Tuid', v => uqBlock<Tuid>(v, buildTuid));
	appendArr<Action>(uq.actionArr, 'Action', v => uqBlock<Action>(v, buildAction));
	appendArr<Sheet>(uq.sheetArr, 'Sheet', v => uqBlock<Sheet>(v, buildSheet));
	appendArr<Book>(uq.bookArr, 'Book', v => uqBlock<Book>(v, buildBook));
	appendArr<Query>(uq.queryArr, 'Query', v => uqBlock<Query>(v, buildQuery));
	appendArr<Map>(uq.mapArr, 'Map', v => uqBlock<Map>(v, buildMap));
	appendArr<History>(uq.historyArr, 'History', v => uqBlock<History>(v, buildHistory));
	appendArr<Pending>(uq.pendingArr, 'Pending', v => uqBlock<Pending>(v, buildPending));
	appendArr<Tag>(uq.tagArr, 'Tag', v => uqBlock<Tag>(v, buildTag));
	ts += '\n}\n}\n';
	tsImport += ' } from "tonva-react";';
	return tsImport + ts;
}

function buildFields(fields: Field[], indent:number = 1) {
	if (!fields) return '';
	let ts = '';
	for (let f of fields) {
		ts += buildField(f, indent);
	}
	return ts;
}

const fieldTypeMap:{[type:string]:string} = {
	"char": "string",
	"text": "string",
	"id": "number",
	"int": "number",
	"bigint": "number",
	"smallint": "number",
	"tinyint": "number",
	"dec": "number",
};
function buildField(field: Field, indent:number = 1) {
	let {type} = field;
	let s = fieldTypeMap[type];
	if (!s) s = 'any';
	return `\n${'\t'.repeat(indent)}${field.name}: ${s};`;
}

function buildArrs(arrFields: ArrFields[]):string {
	if (!arrFields) return '';
	let ts = '\n';
	for (let af of arrFields) {
		ts += `\t${camelCase(af.name)}: {`;
		ts += buildFields(af.fields, 2);
		ts += '\n\t}[];\n';
	}
	return ts;
}

/*
const typeMap:{[type:string]:string} = {
	action: 'Action',
	query: 'Query',
}
*/
function buildReturns(entity:Entity, returns:ArrFields[]):string {
	if (!returns) return;
	//let {typeName} = entity;
	//let type = typeMap[typeName] || typeName;
	let {sName} = entity;
	sName = capitalCase(sName);
	let ts = '';
	for (let ret of returns) {
		let retName = capitalCase(ret.name);
		ts += `interface Return${sName}${retName} {`;
		ts += buildFields(ret.fields);
		ts += '\n}\n';
	}

	ts += `interface Result${sName} {\n`;
	for (let ret of returns) {
		let retName = capitalCase(ret.name);
		ts += `\t${ret.name}: Return${sName}${retName}[];\n`;
	}
	ts += '}';
	return ts;
}

function buildTuid(tuid: Tuid) {
	let ts = `\t${entityName(tuid.sName)}: UqTuid<Tuid${capitalCase(tuid.sName)}>;`;
	return ts;
}

function buildTuidInterface(tuid: Tuid) {
	let ts = `export interface Tuid${capitalCase(tuid.sName)} {`;
	ts += buildFields(tuid.fields);
	ts += '\n}';
	return ts;
}

function buildAction(action: Action) {
	let ts = `\t${entityName(action.sName)}: UqAction<Param${capitalCase(action.sName)}, Result${capitalCase(action.sName)}>;`;
	return ts;
}

function buildActionInterface(action: Action) {
	let ts = `export interface Param${capitalCase(action.sName)} {`;
	ts += buildFields(action.fields);
	ts += buildArrs(action.arrFields);
	ts += '\n}\n';
	ts += buildReturns(action, action.returns);
	return ts;
}

function buildEnumInterface(enm: UqEnum) {
	let {schema} = enm;
	if (!schema) return;
	let {values} = schema;
	let ts = `export enum ${enm.uq.getUqKey()}_${capitalCase(enm.sName)} {`;
	let first:boolean = true;
	for (let i in values) {
		if (first === false) {
			ts += ',';
		}
		else {
			first = false;
		}
		let v = values[i];
		ts += '\n\t' + i + ' = ';
		if (typeof v === 'string') {
			ts += '"' + v + '"';
		}
		else {
			ts += v;
		}
	}
	return ts += '\n}'
}

function buildQuery(query: Query) {
	let {sName} = query;
	let ts = `\t${entityName(sName)}: UqQuery<Param${capitalCase(sName)}, Result${capitalCase(sName)}>;`;
	return ts;
}

function buildQueryInterface(query: Query) {
	let ts = `export interface Param${capitalCase(query.sName)} {`;
	ts += buildFields(query.fields);
	ts += '\n}\n';
	ts += buildReturns(query, query.returns);
	return ts;
}

function buildSheet(sheet: Sheet) {
	let {sName, verify} = sheet;
	let cName = capitalCase(sName);
	let v = verify? `Verify${cName}` : 'any';
	let ts = `\t${entityName(sName)}: UqSheet<Sheet${cName}, ${v}>;`;
	return ts;
}

function buildSheetInterface(sheet: Sheet) {
	let {sName, fields, arrFields, verify} = sheet;
	let ts = `export interface Sheet${capitalCase(sName)} {`;
	ts += buildFields(fields);
	ts += buildArrs(arrFields);
	ts += '}';

	if (verify) {
		let {returns} = verify;
		ts += `\nexport interface Verify${capitalCase(sName)} {`;
		for (let item of returns) {
			let {name:arrName, fields} = item;
			ts += '\n\t' + arrName + ': {';
			ts += buildFields(fields, 2);
			ts += '\n\t}[];';
		}
		ts += '\n}';
	}
	return ts;
}

function buildBook(book: Book):string {
	let {sName} = book;
	let ts = `\t${entityName(sName)}: UqBook<Param${capitalCase(sName)}, Result${capitalCase(sName)}>;`;
	return ts;
}

function buildBookInterface(book: Book):string {
	let {sName, fields, returns} = book;
	let ts = `export interface Param${capitalCase(sName)} {`;
	ts += buildFields(fields);
	ts += '\n}\n';
	ts += buildReturns(book, returns);
	return ts;
}

function buildMap(map: Map):string {
	let {sName} = map;
	let ts = `\t${entityName(sName)}: UqMap;`;
	return ts;
}

function buildMapInterface(map: Map):string {
	/*
	let {sName, fields, returns} = map;
	let ts = `export interface Param${capitalCaseString(sName)} {`;
	ts += buildFields(fields);
	ts += '\n}\n';
	ts += buildReturns(map, returns);
	return ts;
	*/
	return '';
}

function buildHistory(history: History):string {
	let {sName} = history;
	let ts = `\t${entityName(sName)}: UqHistory<Param${capitalCase(sName)}, Result${capitalCase(sName)}>;`;
	return ts;
}

function buildHistoryInterface(history: History):string {
	let {sName, fields, returns} = history;
	let ts = `export interface Param${capitalCase(sName)} {`;
	ts += buildFields(fields);
	ts += '\n}\n';
	ts += buildReturns(history, returns);
	return ts;
}

function buildPending(pending: Pending):string {
	let {sName} = pending;
	let ts = `\t${entityName(sName)}: UqPending<any, any>;`;
	return ts;
}

function buildPendingInterface(pending: Pending):string {
	/*
	let {sName, fields, returns} = pending;
	let ts = `export interface Param${capitalCaseString(sName)} {`;
	ts += buildFields(fields);
	ts += '\n}\n';
	ts += buildReturns(pending, returns);
	return ts;
	*/
	return '';
}

function buildTag(tag: Tag):string {
	let {sName} = tag;
	let ts = `\t${entityName(sName)}: UqTag;`;
	return ts;
}

function buildTagInterface(tag: Tag):string {
	return;
}

function buildIDInterface(idEntity: ID):string {
	let {sName, fields} = idEntity;
	let ts = `export interface ${capitalCase(sName)} {`;
	ts += buildFields(fields);
	ts += '\n}';
	return ts;
}

function buildIDXInterface(idx: IDX):string {
	let {sName, fields} = idx;
	let ts = `export interface ${capitalCase(sName)} {`;
	ts += buildFields(fields);
	ts += '\n}';
	return ts;
}

function buildID2Interface(id2: ID2):string {
	let {sName, fields} = id2;
	let ts = `export interface ${capitalCase(sName)} {`;
	ts += buildFields(fields);
	ts += '\n}';
	return ts;
}

function buildIDActInterface(uq: UqMan) {
	let ts = `\nexport interface ParamIDActs {`;
	uq.idArr.forEach(v => {
		let {sName} = v;
		ts += `\n\t${camelCase(sName)}?: ${capitalCase(sName)}[];`;
	});
	uq.idxArr.forEach(v => {
		let {sName} = v;
		ts += `\n\t${camelCase(sName)}?: ${capitalCase(sName)}[];`;
	});
	uq.id2Arr.forEach(v => {
		let {sName} = v;
		ts += `\n\t${camelCase(sName)}?: ${capitalCase(sName)}[];`;
	});
	ts += '\n}\n';
	return ts;
}