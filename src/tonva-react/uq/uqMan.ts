import _, { identity } from 'lodash';
import { UqApi, UqData, UnitxApi/*, appInFrame*/ } from '../net';
import { Tuid, TuidDiv, TuidImport, TuidInner, TuidBox, TuidsCache } from './tuid';
import { Action } from './action';
import { Sheet } from './sheet';
import { Query } from './query';
import { Book } from './book';
import { History } from './history';
import { Map } from './map';
import { Pending } from './pending';
import { CreateBoxId, BoxId } from './tuid';
import { LocalMap, LocalCache, env, capitalCase } from '../tool';
import { UQsMan } from './uqsMan';
import { ReactBoxId } from './tuid/reactBoxId';
import { Tag } from './tag/tag';
import { UqEnum } from './enum';
import { Entity } from './entity';
import { UqConfig } from 'tonva-react/app';
import { ID, ID2, IDX } from './ID';
import { nav } from 'tonva-react/components';

export type FieldType = 'id' | 'tinyint' | 'smallint' | 'int' | 'bigint' | 'dec' | 'char' | 'text'
    | 'datetime' | 'date' | 'time' | 'timestamp';

export function fieldDefaultValue(type:FieldType) {
    switch (type) {
        case 'tinyint':
        case 'smallint':
        case 'int':
        case 'bigint':
        case 'dec':
            return 0;
        case 'char':
        case 'text':
            return '';
        case 'datetime':
        case 'date':
            return '2000-1-1';
        case 'time':
            return '0:00';
    }
}

export interface Field {
    name: string;
    type: FieldType;
    tuid?: string;
    arr?: string;
    null?: boolean;
    size?: number;
    owner?: string;
    _tuid: TuidBox;
}
export interface ArrFields {
    name: string;
    fields: Field[];
    id?: string;
    order?: string;
}
export interface FieldMap {
    [name:string]: Field;
}
export interface SchemaFrom {
    owner:string;
    uq:string;
}
export interface TuidModify {
    max: number;
    seconds: number;
}

interface ParamPage {
	start:number;
	size:number;
}

export interface ParamIDDetail<M,D> {
	master: {
		name: string;
		value: M;
	};
	detail: {
		name: string;
		values: D[];
	};
}

export interface RetIDDetail {
	master: number;
	detail: number[];
}

export interface ParamIDDetail2<M,D,D2> extends ParamIDDetail<M, D> {
	detail2: {
		name: string;
		values: D2[];
	};
}

export interface RetIDDetail2 extends RetIDDetail {
	detail2: number[];
}

export interface ParamIDDetail3<M,D,D2,D3> extends ParamIDDetail2<M, D, D2> {
	detail3: {
		name: string;
		values: D3[];
	};
}

export interface RetIDDetail3 extends RetIDDetail2 {
	detail3: number[];
}

export interface ParamIDDetailGet {
	id: number;
	master: string;
	detail: string;
	detail2?: string;
	detail3?: string;
}

export interface ParamID {
	IDX: string | string[];
	id: number | number[];
	page?: ParamPage;
}

export interface ParamKeyID {
	IDX: string | string[];
	key: number[];
	page?: ParamPage;
}

export interface ParamID2 {
	ID2: string;
	id: number | number[];
	IDX: string | string[];
	page?: ParamPage;
}

export interface ParamKeyID2 {
	ID: string;
	key: number[];
	ID2: string;
	IDX: string | string[];
	page?: ParamPage;
}

export interface ParamIDLog {
	IDX: string;
	field: string;
	id: number;
	log: 'each' | 'day' | 'month' | 'year';
	timeZone?: number;
	page: ParamPage;
}

function IDPath(path:string):string {return path;}

export interface UqBase<P> {
	$name: string;
	IDActs(param:P): Promise<any>;
	IDDetail<M,D>(param: ParamIDDetail<M,D>): Promise<RetIDDetail>;
	IDDetail<M,D,D2>(param: ParamIDDetail2<M,D,D2>): Promise<RetIDDetail2>;
	IDDetail<M,D,D2,D3>(param: ParamIDDetail3<M,D,D2,D3>): Promise<RetIDDetail3>;
	IDDetailGet<M,D>(param: ParamIDDetailGet): Promise<[M[], D[]]>;
	IDDetailGet<M,D,D2>(param: ParamIDDetailGet): Promise<[M[], D[], D2[]]>;
	IDDetailGet<M,D,D2,D3>(param: ParamIDDetailGet): Promise<[M[], D[], D2[], D3[]]>;
	ID<T>(param: ParamID): Promise<T[]>;
	KeyID<T>(param: ParamKeyID): Promise<T[]>;
	ID2<T>(param: ParamID2): Promise<T[]>;
	KeyID2<T>(param: ParamKeyID2): Promise<T[]>;
	IDLog<T> (param: ParamIDLog): Promise<T[]>;
}

export class UqMan {
	private readonly entities: {[name:string]: Entity} = {};
	private readonly enums: {[name:string]: UqEnum} = {};
	private readonly actions: {[name:string]: Action} = {};
    private readonly queries: {[name:string]: Query} = {};
	private readonly ids: {[name:string]: ID} = {};
	private readonly idxs: {[name:string]: IDX} = {};
	private readonly id2s: {[name:string]: ID2} = {};

    private readonly sheets: {[name:string]: Sheet} = {};
    private readonly books: {[name:string]: Book} = {};
    private readonly maps: {[name:string]: Map} = {};
    private readonly histories: {[name:string]: History} = {};
	private readonly pendings: {[name:string]: Pending} = {};
	private readonly tags: {[name:string]: Tag} = {};
    private readonly tuidsCache: TuidsCache;
    private readonly localEntities: LocalCache;
    private readonly tvs:{[entity:string]:(values:any)=>JSX.Element};
    readonly localMap: LocalMap;
    readonly localModifyMax: LocalCache;
    readonly tuids: {[name:string]: Tuid} = {};
    readonly createBoxId: CreateBoxId;
    readonly newVersion: boolean;
    readonly uqOwner: string;
    readonly uqName: string;
    readonly name: string;
    readonly uqApi: UqApi;
	readonly id: number;

    uqVersion: number;
	//ownerProfix: string;
	config: UqConfig;

    constructor(uqs:UQsMan, uqData: UqData, createBoxId:CreateBoxId, tvs:{[entity:string]:(values:any)=>JSX.Element}) {
        this.createBoxId = createBoxId;
        if (createBoxId === undefined) {
            this.createBoxId = this.createBoxIdFromTVs;
            this.tvs = tvs || {};
        }
        let {id, uqOwner, uqName, /*access, */newVersion} = uqData;
        this.newVersion = newVersion;
        this.uqOwner = uqOwner;
        this.uqName = uqName;
        this.id = id;
        this.name = uqOwner + '/' + uqName;
        this.uqVersion = 0;
		//this.localMap = uqs.localMap.map(this.name);
		this.localMap = env.localDb.map(this.name);
        this.localModifyMax = this.localMap.child('$modifyMax');
        this.localEntities = this.localMap.child('$access');
        let baseUrl = 'tv/';

		/*
        let acc: string[];
        if (access === null || access === undefined || access === '*') {
            acc = [];
        }
        else {
            acc = access.split(';').map(v => v.trim()).filter(v => v.length > 0);
		}
		*/
        if (this.name === '$$$/$unitx') {
            // 这里假定，点击home link之后，已经设置unit了
            // 调用 UnitxApi会自动搜索绑定 unitx service
            this.uqApi = new UnitxApi(env.unit);
        }
        else {
            //let {appOwner, appName} = uqs;
            this.uqApi = new UqApi(baseUrl, /*appOwner, appName, */uqOwner, uqName/*, acc*/, true);
        }
        this.tuidsCache = new TuidsCache(this);
    }
	/*
    get entities() {
        return _.merge({}, 
            this.actions, this.sheets, this.queries, this.books,
			this.maps, this.histories, this.pendings, this.tuids,
			this.tags,
        );
	}
	*/

    private createBoxIdFromTVs:CreateBoxId = (tuid:Tuid, id:number):BoxId =>{
        let {name} = tuid;
        /*
        let tuidUR = this.tuidURs[name];
        if (tuidUR === undefined) {
            let {ui, res} = this.getUI(tuid);
            this.tuidURs[name] = tuidUR = new TuidWithUIRes(tuid, ui, res);
        }
        */
        return new ReactBoxId(id, tuid, this.tvs[name]);
	}
	
	private roles:string[];
	async getRoles():Promise<string[]> {
		if (this.roles !== undefined) return this.roles;
		this.roles = await this.uqApi.getRoles();
		return this.roles;
	}

    tuid(name:string):Tuid {return this.tuids[name.toLowerCase()]}
    tuidDiv(name:string, div:string):TuidDiv {
        let tuid = this.tuids[name.toLowerCase()]
        return tuid && tuid.div(div.toLowerCase());
    }
    action(name:string):Action {return this.actions[name.toLowerCase()]}
    sheet(name:string):Sheet {return this.sheets[name.toLowerCase()]}
    query(name:string):Query {return this.queries[name.toLowerCase()]}
    book(name:string):Book {return this.books[name.toLowerCase()]}
    map(name:string):Map {return this.maps[name.toLowerCase()]}
    history(name:string):History {return this.histories[name.toLowerCase()]}
    pending(name:string):Pending {return this.pendings[name.toLowerCase()]}

    sheetFromTypeId(typeId:number):Sheet {
        for (let i in this.sheets) {
            let sheet = this.sheets[i];
            if (sheet.typeId === typeId) return sheet;
        }
    }

	allRoles: string[];
    readonly tuidArr: Tuid[] = [];
    readonly actionArr: Action[] = [];
    readonly queryArr: Query[] = [];
    readonly idArr: ID[] = [];
    readonly idxArr: IDX[] = [];
    readonly id2Arr: ID2[] = [];
    readonly enumArr: UqEnum[] = [];
    readonly sheetArr: Sheet[] = [];
    readonly bookArr: Book[] = [];
    readonly mapArr: Map[] = [];
    readonly historyArr: History[] = [];
    readonly pendingArr: Pending[] = [];
    readonly tagArr: Tag[] = [];

    async init() {
        await this.uqApi.init();
    }

    async loadEntities(): Promise<string> {
        try {
            let entities = this.localEntities.get();
            if (!entities) {
                entities = await this.uqApi.loadEntities();
			}
            if (!entities) return;
            this.buildEntities(entities);
        }
        catch (err) {
            return err;
        }
    }

	buildEntities(entities:any) {
        if (entities === undefined) {
            debugger;
        }
        this.localEntities.set(entities);
        let {access, tuids, role, version} = entities;
		this.uqVersion = version;
		this.allRoles = role?.names;
        this.buildTuids(tuids);
		this.buildAccess(access);
	}
	
    private buildTuids(tuids:any) {
        for (let i in tuids) {
            let schema = tuids[i];
            let {typeId, from} = schema;
            let tuid = this.newTuid(i, typeId, from);
            tuid.sys = true;
        }
        for (let i in tuids) {
            let schema = tuids[i];
            let tuid = this.getTuid(i);
            tuid.setSchema(schema);
        }
        for (let i in this.tuids) {
            let tuid = this.tuids[i];
            tuid.buildFieldsTuid();
        }
	}

    async loadEntitySchema(entityName: string): Promise<any> {
        return await this.uqApi.schema(entityName);
    }

	async loadAllSchemas():Promise<void> {
		let ret = await this.uqApi.allSchemas();
		let entities: Entity[][] = [
			this.actionArr, 
			this.enumArr,
			this.sheetArr,
			this.queryArr,
			this.bookArr,
			this.mapArr,
			this.historyArr,
			this.pendingArr,
			this.tagArr,
			this.idArr,
			this.idxArr,
			this.id2Arr,
		];
		entities.forEach(arr => {
			arr.forEach(v => {
				let entity = ret[v.name.toLowerCase()];
				if (!entity) return;
				let schema = entity.call;
				if (!schema) return;
				v.buildSchema(schema);
			});
		});
	}

    getTuid(name:string): Tuid {
        return this.tuids[name];
    }

    private buildAccess(access:any) {
        for (let a in access) {
            let v = access[a];
            switch (typeof v) {
                case 'string': this.fromType(a, v); break;
                case 'object': this.fromObj(a, v); break;
            }
        }
    }

    cacheTuids(defer:number) {
        this.tuidsCache.cacheTuids(defer);
    }

	private setEntity(name:string, entity:Entity) {
		this.entities[name] = entity;
		this.entities[name.toLowerCase()] = entity;
	}

    newEnum(name:string, id:number):UqEnum {
        let enm = this.enums[name];
        if (enm !== undefined) return enm;
		enm = this.enums[name] = new UqEnum(this, name, id);
		this.setEntity(name, enm);
        this.enumArr.push(enm);
        return enm;
    }
	newAction(name:string, id:number):Action {
        let action = this.actions[name];
        if (action !== undefined) return action;
        action = this.actions[name] = new Action(this, name, id);
		this.setEntity(name, action);
        this.actionArr.push(action);
        return action;
    }
    private newTuid(name:string, id:number, from:SchemaFrom):Tuid {
        let tuid = this.tuids[name];
        if (tuid !== undefined) return tuid;
        if (from !== undefined)
            tuid = new TuidImport(this, name, id, from);
        else
            tuid = new TuidInner(this, name, id);
        this.tuids[name] = tuid;
		this.setEntity(name, tuid);
        this.tuidArr.push(tuid);
        return tuid;
    }
    newQuery(name:string, id:number):Query {
        let query = this.queries[name];
        if (query !== undefined) return query;
        query = this.queries[name] = new Query(this, name, id)
		this.setEntity(name, query);
        this.queryArr.push(query);
        return query;
    }
    private newBook(name:string, id:number):Book {
        let book = this.books[name];
        if (book !== undefined) return book;
        book = this.books[name] = new Book(this, name, id);
		this.setEntity(name, book);
        this.bookArr.push(book);
        return book;
    }
    private newMap(name:string, id:number):Map {
        let map = this.maps[name];
        if (map !== undefined) return map;
        map = this.maps[name] = new Map(this, name, id)
		this.setEntity(name, map);
        this.mapArr.push(map);
        return map;
    }
    private newTag(name:string, id:number):Tag {
        let tag = this.tags[name];
        if (tag !== undefined) return tag;
        tag = this.tags[name] = new Tag(this, name, id)
		this.setEntity(name, tag);
        this.tagArr.push(tag);
        return tag;
    }
    private newHistory(name:string, id:number):History {
        let history = this.histories[name];
        if (history !== undefined) return;
        history = this.histories[name] = new History(this, name, id)
		this.setEntity(name, history);
        this.historyArr.push(history);
        return history;
    }
    private newPending(name:string, id:number):Pending {
        let pending = this.pendings[name];
        if (pending !== undefined) return;
        pending = this.pendings[name] = new Pending(this, name, id)
		this.setEntity(name, pending);
        this.pendingArr.push(pending);
        return pending;
    }
    private newSheet(name:string, id:number):Sheet {
        let sheet = this.sheets[name];
        if (sheet !== undefined) return sheet;
        sheet = this.sheets[name] = new Sheet(this, name, id);
		this.setEntity(name, sheet);
        this.sheetArr.push(sheet);
        return sheet;
    }
    private newID(name:string, id:number):ID {
        let idEntity = this.ids[name];
        if (idEntity !== undefined) return idEntity;
        idEntity = this.ids[name] = new ID(this, name, id);
		this.setEntity(name, idEntity);
        this.idArr.push(idEntity);
        return idEntity;
    }
    private newIDX(name:string, id:number):IDX {
        let idx = this.idxs[name];
        if (idx !== undefined) return idx;
        idx = this.idxs[name] = new IDX(this, name, id);
		this.setEntity(name, idx);
        this.idxArr.push(idx);
        return idx;
    }
    private newID2(name:string, id:number):ID2 {
        let id2 = this.id2s[name];
        if (id2 !== undefined) return id2;
        id2 = this.ids[name] = new ID2(this, name, id);
		this.setEntity(name, id2);
        this.id2Arr.push(id2);
        return id2;
    }
    private fromType(name:string, type:string) {
        let parts = type.split('|');
        type = parts[0];
        let id = Number(parts[1]);
        switch (type) {
            //case 'uq': this.id = id; break;
            case 'tuid':
                // Tuid should not be created here!;
                //let tuid = this.newTuid(name, id);
                //tuid.sys = false;
				break;
			case 'id': this.newID(name, id); break;
			case 'idx': this.newIDX(name, id); break;
			case 'id2': this.newID2(name, id); break;
            case 'action': this.newAction(name, id); break;
            case 'query': this.newQuery(name, id); break;
            case 'book': this.newBook(name, id); break;
            case 'map': this.newMap(name, id); break;
            case 'history': this.newHistory(name, id); break;
            case 'sheet':this.newSheet(name, id); break;
			case 'pending': this.newPending(name, id); break;
			case 'tag': this.newTag(name, id); break;
			case 'enum': this.newEnum(name, id); break;
        }
    }
    private fromObj(name:string, obj:any) {
        switch (obj['$']) {
            case 'sheet': this.buildSheet(name, obj); break;
        }
    }
    private buildSheet(name:string, obj:any) {
        let sheet = this.sheets[name];
        if (sheet === undefined) sheet = this.newSheet(name, obj.id);
        sheet.build(obj);
    }
    buildFieldTuid(fields:Field[], mainFields?:Field[]) {
        if (fields === undefined) return;
        for (let f of fields) {
            let {tuid} = f;
            if (tuid === undefined) continue;
            let t = this.getTuid(tuid);
            if (t === undefined) continue;
            f._tuid = t.buildTuidBox();
        }
        for (let f of fields) {
            let {owner} = f;
            if (owner === undefined) continue;
            let ownerField = fields.find(v => v.name === owner);
            if (ownerField === undefined) {
                if (mainFields !== undefined) {
                    ownerField = mainFields.find(v => v.name === owner);
                }
                if (ownerField === undefined) {
                    debugger;
                    throw new Error(`owner field ${owner} is undefined`);
                }
            }
            let {arr, tuid} = f;
            let t = this.getTuid(ownerField._tuid.tuid.name);
            if (t === undefined) continue;
            let div = t.div(arr || tuid);
            f._tuid = div && div.buildTuidDivBox(ownerField);
            if (f._tuid === undefined) {
                debugger;
                throw new Error(`owner field ${owner} is not tuid`);
            }
        }
    }
    buildArrFieldsTuid(arrFields:ArrFields[], mainFields:Field[]) {
        if (arrFields === undefined) return;
        for (let af of arrFields) {
            let {fields} = af;
            if (fields === undefined) continue;
            this.buildFieldTuid(fields, mainFields);
        }
    }

    pullModify(modifyMax:number) {
        this.tuidsCache.pullModify(modifyMax);
	}

	getUqKey() {
		//let l = this.uqName.toLowerCase();
		let uqKey:string = this.uqName.split(/[-._]/).join('').toLowerCase();
		if (this.config) {
			let {dev} = this.config;
			uqKey = capitalCase(dev.alias || dev.name) + capitalCase(uqKey);
		}
		return uqKey;
	}
	
	proxy():any {
		let ret = new Proxy(this.entities, {
			get: (target, key, receiver) => {
				let lk = (key as string).toLowerCase();
				if (lk === '$name') {
					return this.name;
				}
				let ret = target[lk];
				if (ret !== undefined) return ret;
				switch (key) {
					default: debugger; break;
					case 'IDActs': return this.IDActs;
					case 'IDDetail': return this.IDDetail;
					case 'IDDetailGet': return this.IDDetailGet;
					case 'ID': return this.ID;
					case 'KeyID': return this.KeyID;
					case 'ID2': return this.ID2;
					case 'KeyID2': return this.KeyID2;
					case 'IDLog': return this.IDLog;
				}
				let err = `entity ${this.name}.${String(key)} not defined`;
				console.error(err);
				this.showReload('UQ错误：' + err);
				return undefined;
			}
		});
		return ret;
	}

    private showReload(msg: string) {
		this.localMap.removeAll();
		nav.showReloadPage(msg);
    }

	private IDActs = async (param:any): Promise<any> => {
		// 这边的obj属性序列，也许会不一样
		let arr:string[] = [];
		for (let i in param) arr.push(i);
		param['$'] = arr;
		let ret = await this.uqApi.post(IDPath('id-acts'), param);
		let retArr = (ret[0].ret as string).split('\n');
		let retActs:{[key:string]:number[]} = {};
		for (let i=0; i<arr.length; i++) {
			retActs[arr[i]] = ids(retArr[i].split('\t'));
		}
		return retActs;
	}

	private IDDetail = async (param: ParamIDDetail<any, any>): Promise<any> => {
		let ret = await this.uqApi.post(IDPath('id-detail'), param);		
		let val:string = ret[0].ret;
		let parts = val.split('\n');
		let items = parts.map(v => v.split('\t'));
		ret = {
			master: ids(items[0])[0],
			detail: ids(items[1]),
			detail2: ids(items[2]),
			detail3: ids(items[3]),
		};
		return ret;
	}

	private IDDetailGet = async (param: ParamIDDetailGet): Promise<any> => {
		let ret = await this.uqApi.post(IDPath('id-detail-get'), param);
		return ret;
	}

	private checkParam(ID:string, IDX:string|string[], ID2:string, id:number|number[], key:number[], page: ParamPage) {

	}

	private ID = async (paramID: ParamID): Promise<any[]> => {
		let {IDX, id, page} = paramID;
		this.checkParam(null, IDX, null, id, null, page);
		let ret = await this.uqApi.post(IDPath('id'), paramID);
		return ret;
	}
	private KeyID = async (paramKeyID: ParamKeyID): Promise<any[]> => {
		let {IDX, key, page} = paramKeyID;
		this.checkParam(null, IDX, null, null, key, page);
		let ret = await this.uqApi.post(IDPath('key-id'), paramKeyID);
		return ret;
	}
	private ID2 = async (paramID2: ParamID2): Promise<any[]> => {
		let {ID2, IDX, id, page} = paramID2;
		this.checkParam(null, IDX, ID2, id, null, page);
		let ret = await this.uqApi.post(IDPath('id2'), paramID2);
		return ret;
	}
	private KeyID2 = async (paramKeyID2: ParamKeyID2): Promise<any[]> => {
		let {ID, ID2, IDX, key, page} = paramKeyID2;
		this.checkParam(ID, IDX, ID2, null, key, page);
		let ret = await this.uqApi.post(IDPath('key-id2'), paramKeyID2);
		return ret;
	}
	private IDLog = async (paramIDLog: ParamIDLog): Promise<any[]> => {
		let {IDX, id, page} = paramIDLog;		
		this.checkParam(null, IDX, null, id, null, page);
		let ret = await this.uqApi.post(IDPath('id-log'), paramIDLog);
		return ret;
	}
}

function ids(item:string[]):number[] {
	if (!item) return;
	let len = item.length;
	if (len <= 1) return;
	let ret:number[] = [];
	for (let i=0; i<len-1; i++) ret.push(Number(item[i]));
	return ret;
}
