//=== UqApp builder created on Tue Jan 05 2021 18:41:24 GMT-0500 (GMT-05:00) ===//
import { VPage, Page, TabProp, TabCaptionComponent, t } from 'tonva-react';
import { CApp } from './CApp';

const color = (selected: boolean) => selected === true ? 'text-primary' : 'text-muted';
function caption(label:string, icon:string) {
	return (selected: boolean) => TabCaptionComponent(label, icon, color(selected));
}

export class VMain extends VPage<CApp> {
	async open(param?: any, onClosePage?: (ret:any)=>void) {
		this.openPage(this.render, param, onClosePage);
	}

	render = (param?: any): JSX.Element => {
		let { cHome, cBug, cMe } = this.controller;
		let tabs: TabProp[] = [
			{name: 'home', caption: caption(t('home'), 'home'), content: cHome.tab},
			{name: 'me', caption: caption(t('me'), 'user-o'), content: cMe.tab, load: cMe.load},
		];
		if (this.isDev === true) {
			tabs.push({
				name: 'debug', caption: caption(t('debug'), 'bug'), content: cBug.tab, onShown: cBug.load
			});
		}
		return <Page tabsProps={{tabs}} webNav={{navHeader: <div>webNav header</div>, navFooter: <div>webNav footer</div>}} />;
	}
}
