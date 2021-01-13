import { CUqBase } from "../UqApp";
import { nav, QueryPager, UQsMan, User } from "tonva-react";
import { VMe } from "./VMe";
import { VEditMe } from "./VEditMe";
import { VRoles } from "./VRoles";
//import { CRoleAdmin } from "tonva-react-uq-roles";
import { CRoleAdmin } from "./roleAdmin";
import { makeObservable, observable } from "mobx";

export interface RootUnitItem {
	id: number;					// root unit id
	owner: any;
	name: string;				// 唯一
	content: string;
	tonvaUnit: number;			// 跟tonva机构对应的值
	x: number;
}

const roleCaptionMap:{[role:string]: string} = {
	accountant: '会计',
	manager: '经理',
}

export class CMe extends CUqBase {
	role: number;
	unitOwner: User;
	rootUnits: QueryPager<any>;
	roles: string[] = null;

	constructor(res:any) {
		super(res);
		makeObservable(this, {
			roles: observable,
		})
	}

    protected async internalStart() {
	}

	tab = () => {
		return this.renderView(VMe);
	}

	showEditMe = async () => {
		//let result = await this.uqs.Notes.GetSystemRole.query({});
		//this.role = result.ret[0]?.role;
		this.openVPage(VEditMe);
	}

	/*
	showAdmin = async () => {
		this.rootUnits = new QueryPager<any>(this.uqs.Notes.GetRootUnits, undefined, undefined, true);
		this.rootUnits.first({});
		this.openVPage(VAdmin);
	}

	async createRootUnit(param: {name:string; content:string; owner:number}): Promise<number> {
		let result = await this.uqs.Notes.CreateRootUnit.submit(param);
		return result.id;
	}

	async changeRootUnitName(item:RootUnitItem, name:string) {
		await this.uqs.Notes.ChangeRootUnitProp.submit({unit:item.id, prop:'name', value: name})
		item.name = name;
	}

	async changeRootUnitTonva(item:RootUnitItem, tonvaUnit:any) {
		await this.uqs.Notes.ChangeRootUnitProp.submit({unit:item.id, prop:'tonvaUnit', value: tonvaUnit})
		item.tonvaUnit = tonvaUnit;
	}

	async changeRootUnitX(item:RootUnitItem, x:number) {
		await this.uqs.Notes.ChangeRootUnitProp.submit({unit:item.id, prop:'x', value: x as any})
		item.x = x;
	}
	*/

	load = async () => {
		this.roles = await this.getUqRoles(this.uqs.BzHelloTonva.$name);
	}

	backend = async () => {
		this.openVPage(VRoles);
	}

	async showRoleAdmin() {
		let  uq = UQsMan.uq(this.uqs.BzHelloTonva.$name);
		let {allRoles} = uq;
		if (!allRoles || allRoles.length === 0) {
			alert(`uq ${uq.name} has not defined roles`);
			return;
		}
		let cRoleAdmin = new CRoleAdmin(this.res, uq, this.myRolesChanged, roleCaptionMap);
		await cRoleAdmin.start();
	}

	private myRolesChanged = (roles:string[]) => {
		this.roles = roles;
		this.user.roles[this.uqs.BzHelloTonva.$name] = roles;
		nav.saveLocalUser();
	}
}
