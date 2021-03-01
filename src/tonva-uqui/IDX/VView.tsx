import { makeObservable, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { CSSProperties } from "react";
import { Bar } from "react-chartjs-2";
import { FA, LMR, NumberProp, Prop, VPage } from "tonva-react";
import { CIDX } from "./CIDX";

const spans = ['week', 'month'];

export class VView extends VPage<CIDX> {
	currentIndex: number = 0;
	constructor(controller:CIDX) {
		super(controller);
		makeObservable(this, {
			currentIndex: observable,
		});
	}

	header() {return 'View'}
	right() {
		return <button
			className="btn btn-sm btn-primary mr-2" 
			onClick={() => this.controller.onItemEdit()}>
			<FA name="pencil-square-o" />
		</button>;
	}
	content() {		
		let V = observer(() => {
			const data = {
				labels: this.controller.timeSpan.labels,
				datasets: [{
					label: '',
					data: [12, 19, 3, 5, 2, 3],
					backgroundColor: 'lightgreen',
					borderWidth: 1
				}],
			};
			const options = {
				title: {
					display: false,
				},
				maintainAspectRatio: false,
			}
			let {spanValues, mid: com, timeSpan} = this.controller;
			let {props} = com;
			let curProp = props[this.currentIndex] as NumberProp;
			let {label, name} = curProp;
			let left = <div className="cursor-pointer" onClick={()=>this.controller.prevTimeSpan()}>
				<FA name="chevron-left" />
			</div>;
			let right = timeSpan.canNext === true?			
				<div className="cursor-pointer" onClick={()=>this.controller.nextTimeSpan()}>
					<FA name="chevron-right" />
				</div>
				:
				<div><FA className="text-muted" name="square-o" /></div>;
			return <div className="py-3">
				<div className="container">
					<div className="row">
						{spans.map(v => {
							let cn = 'col text-center p-2 cursor-pointer ';
							let style:CSSProperties = {
								borderBottomWidth: '0.15rem',
								borderBottomStyle: 'solid',
							};
							if (this.controller.timeSpan.type === v) {
								cn += 'text-primary font-weight-bold';
								style.borderBottomColor = 'blue';
							}
							else {
								cn += 'text-muted';
								style.borderBottomColor = 'lightgray';
							}
							return <div key={v} className={cn} style={style} 
								onClick={()=>this.tabClick(v as any)}>{this.t(v)}</div>;
						})}
					</div>
				</div>
				<LMR className="text-center m-3" 
					left={left} 
					right={right}>
					{this.controller.timeSpan.title}
				</LMR>
				<div className="mt-3 mx-3 text-center cursor-pointer"
					onClick={() => this.onFieldHistory(name)}>
					<h4 className="d-inline">{label}</h4>
					<span className="text-info small"> <FA name="angle-double-right" /> 查看明细</span>
				</div>
				<div className="p-3 h-12c">
					<Bar data={data} width={100} height={50} options={options} />
				</div>
				<div className="d-flex flex-wrap p-1"> 
					{props.map((v, index) => {
						let {name, label} = v as any;
						let sv = spanValues[name];
						let val = sv?
							<b className="h3 mb-0">{sv}</b>
							:
							<small className="text-muted">0</small>
						let cn = 'm-1 w-8c h-8c d-flex flex-column align-items-center justify-content-center bg-white px-3 cursor-pointer border rounded ';
						cn += (index === this.currentIndex)? ' border-primary' : ' ';
						return <div key={index} className={cn} onClick={() => this.onFieldClick(v, index)}>
							<div className="my-3 h-4c d-flex align-items-center">{val}</div>
							<div className="mb-3">{label}</div>
						</div>
					})}
				</div>
			</div>;
		});
		return <V />;
	}

	private tabClick(span:'day'|'week'|'month'|'year') {
		this.controller.setTimeSpan(span);
	}

	private onFieldClick(prop:Prop, index:number) {
		runInAction(() => {
			this.currentIndex = index;
		});
	}

	private async onFieldHistory(field:string) {
		await this.controller.onFieldHistory(field);
	}
}
