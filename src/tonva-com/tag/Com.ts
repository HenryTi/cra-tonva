import { ID, ID2, UqBase } from "tonva-react";

const cacheMax = 100;
export class ComTag {
	private uq: UqBase;
	private tagID: ID;
	private tagID2: ID2;
	private cache:{[id:number]:any} = {};
	private arr: number[] = [];
	constructor(uq: UqBase, tagID: ID, tagID2: ID2) {
		this.uq = uq;
		this.tagID = tagID;
		this.tagID2 = tagID2;
	}

	async load(id:number): Promise<any[]> {
		let ret = this.cache[id];
		if (ret) {
			let index = this.arr.findIndex(v => v===id);
			this.arr.splice(index, 1);
			this.arr.push(id);
			return ret;
		}
		ret = await this.uq.ID2({
			ID2: this.tagID2,
			id,
			IDX: [this.tagID],
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

