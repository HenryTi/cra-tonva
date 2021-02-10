import { ID, IX, Tag, Uq } from "tonva-react";

const cacheMax = 100;
export class MidTag {
	private uq: Uq;
	private ID: ID;
	private IX: IX;
	private tag: ID;
	private cache:{[id:number]:any} = {};
	private arr: number[] = [];
	constructor(uq: Uq, ID: ID, tagIX: IX, tag:ID) {
		this.uq = uq;
		this.ID = ID;
		this.IX = tagIX;
		this.tag = tag;
	}

	async load(id:number): Promise<any[]> {
		let ret = this.cache[id];
		if (ret) {
			let index = this.arr.findIndex(v => v===id);
			this.arr.splice(index, 1);
			this.arr.push(id);
			return ret;
		}
		ret = await this.uq.IX({
			IX: this.IX,
			id,
			IDX: [this.ID],
			page: undefined,
		});
		this.cache[id] = ret;
		this.arr.push(id);
		if (this.arr.length > cacheMax) {
			let removeId = this.arr.shift();
			delete this.cache[removeId];
		}
		return ret;
	}
}

