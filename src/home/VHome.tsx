import { FA, VPage } from "tonva-react";
import { CHome } from "./CHome";
import logo from '../logo.svg';
import '../App.css';

export class VHome extends VPage<CHome> {
	private items:string[] = [
		'在服务器端创建app',
		'创建uq编程单元',
		'uq关联app',
		'uq绑定数据库服务',
		'编写uq代码',
		'提交uq编译生成数据库',
		'在 UqApp/uqAppOptions.ts 设置 uq-app',
		'在vs code调试环境运行Build UqApp，生成uq typescript interface',
		'调用uq接口，读写数据',
	];
	header() {return '首页'}
	content() {
		return <div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
				<span className="text-success">tonva</span> + <span className="text-primary">uq</span> = UI + DB
				</p>
				<div className="mb-3 h6 text-warning">
					编程
					<FA name="handshake-o" size="lg" className="text-danger mx-2" />
					开心
				</div>
			</header>
			<ul className="text-left my-3 mr-3">
			{this.items.map((v, index) => <li key={index} className="my-2">{v}</li>)}
			</ul>
		</div>;
	}
}