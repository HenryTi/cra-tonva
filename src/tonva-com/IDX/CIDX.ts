import { makeObservable, observable, runInAction } from "mobx";
import { Controller, PageItems } from "tonva-react";
import { HistoryPageItems, TimeSpan } from "../tools";
import { CIDXList, MidIDXList } from "./CIDXList";
import { MidIDX } from "./Mid";
import { res } from "./res";
import { VEdit } from "./VEdit";
import { VHistory } from "./VHistory";
import { VView } from "./VView";

export class CIDX extends Controller {
	mid: MidIDX;
	private historyPageItems: HistoryPageItems<any>
	constructor(mid:MidIDX, res?:any) {
		super(res);
		this.mid = mid;
		this.historyPageItems = new HistoryPageItems<any>(mid.historyPageItems);
		makeObservable(this, {
			timeSpan: observable,
			spanValues: observable,
		});
	}

	protected async internalStart() {
		this.setRes(res);
		await this.mid.loadSchema();
		let {uq, ID, IDX} = this.mid;
		let midIDXList = new MidIDXList(uq, ID, IDX);
		midIDXList.onItemClick = this.onItemClick;
		let idList = new CIDXList(midIDXList);
		await idList.start();
	}

	item:any;
	onItemClick: (item:any) => void = async (item:any) => {
		this.item = item;
		await this.setTimeSpan('month');
		this.openVPage(VView);
	}

	onItemEdit = async ():Promise<void> => {
		this.openVPage(VEdit);
	}

	timeSpan:TimeSpan;
	spanValues: any;
	async setTimeSpan(span: 'day'|'week'|'month'|'year') {
		let timeSpan = TimeSpan.create(span);
		runInAction(async () => {
			this.timeSpan = timeSpan;
		});
		await this.loadSum(timeSpan);
	}

	private async loadSum(timeSpan?: TimeSpan) {
		let {far, near} = timeSpan ?? this.timeSpan;
		let ret = await this.mid.loadSum(this.item.id, far, near);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		let [values, sums] = ret;
		let sum = sums[0];
		runInAction(() => {
			this.spanValues = sum ?? {};
		});
	}

	async prevTimeSpan() {
		this.timeSpan.prev();
		await this.loadSum();
	}

	async nextTimeSpan() {
		this.timeSpan.next();
		await this.loadSum();
	}

	get historyItems():PageItems<any> {return this.historyPageItems;}
	field:string;
	async onFieldHistory(field:string) {
		this.field = field;
		await this.mid.loadSchema();
		this.historyPageItems.first({
			id: this.item.id,
			far: this.timeSpan.far,
			near: this.timeSpan.near,
			field
		});
		this.openVPage(VHistory);
	}

	async saveFieldValue(field:string, t:number, value:number|string) {
		let {id} = this.item;
		await this.mid.saveFieldValue(id, field, t, value);
		let ret = await this.mid.loadFieldSum(id, field, this.timeSpan);
		let v= ret[field];
		this.spanValues[field] = v;
		return;
	}
}
