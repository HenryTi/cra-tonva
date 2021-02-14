import { Controller } from "tonva-react";
import { IDBase } from "../base";
import { renderItem, renderItemContainer } from "../tools";
import { ListPage, ListPageProps } from "./ListPage";
import { MidList } from "./MidList";

export abstract class CList<T> extends Controller {
	protected async internalStart() {
		let midList = this.createMidList();
		await midList.init();
		let pageItems = midList.createPageItems();
		let props:ListPageProps = {
			header: this.header,
			pageItems,
			key: midList.key,
			itemClick: (item:any) => this.onItemClick(item),
			right: this.renderRight(),
			renderItem: (item:any, index) => this.renderItem(item, index),
			renderItemContainer: (content:any) => this.renderItemContainer(content),
		};
		pageItems.first(this.firstParam);
		let page = new ListPage(props);
		this.openPage(page.render());
	}

	protected get firstParam():any {return undefined;}
	protected get header():string|JSX.Element {return 'List'}
	protected abstract createMidList(): MidList<any>;
	protected abstract renderRight():JSX.Element;
	protected abstract onItemClick(item:T):void;
	protected renderItem(item:T, index:number):JSX.Element {
		return renderItem(item, index);
	}
	protected renderItemContainer(content:any):JSX.Element {
		return renderItemContainer(content);
	}
}
