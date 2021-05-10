
import { dateFormat } from "../module/util.js";
import Ajax from "../module/ajax.js";
import { Calc, getData as getCalcData, createCalc } from "../module/calc.js";

let changeBtn;
let calc1;
let calc2;
let now = new Date();

function qs(selector) {
	let ele = document.querySelectorAll(selector);
	if (ele) {
		return ele.length == 1 ? ele[0] : ele;
	}
	return null;
}

// 页面加载函数
window.onload = function () {
	console.log("index.js");
	//ajax加载html片段
	let urls = ["html/calc.html", "html/calc2.html"];
	let cnt = 0;

	urls.map(function (url) {
		Ajax.get(url, function () {
			cnt++;
			//加载外部html
			document.querySelector("#calc-container").innerHTML += this.responseText;
			if (cnt == urls.length) {
				//生成计算器对象
				calc1 = createCalc(".calc.front");
				calc2 = createCalc(".calc.back");
				//获取页面dom元素
				changeBtn = document.querySelector(".panel-change");
				//注册事件
				calc1.events();
				calc2.events();
			}
		}, false);
	});

	//layui模块化
	layui.use(['laydate', 'form', 'layer'], function () {
		//模块加载
		const laydate = layui.laydate;
		const form = layui.form;
		const layer = layui.layer;

		//功能模块
		//修改当前日期
		// lay(".basedate").each(function () {
		// 	laydate.render({
		// 		elem: this,
		// 		value: dateFormat(now),
		// 		done: function (value, date, endDate) {
		// 			//calc(calc1); //重新计算
		// 			console.log(111);
		// 		}
		// 	})
		// });
		laydate.render({
			elem: document.querySelector(".calc.front .basedate"),
			value: dateFormat(now)
			, done: function (value, date, endDate) {
				calc(calc1); //重新计算
			}
		});
		laydate.render({
			elem: document.querySelector(".calc.back .basedate"),
			value: dateFormat(now)
			, done: function (value, date, endDate) {
				now = new Date(value); //重新给now赋值
				calc(calc2); //重新计算
			}
		});

		//修改保质期时间的单位
		form.on('select(front-time-unit)', function (data) {
			// 获取
			calc1.shelflifeField = data.value;
			//重新计算
			calc(calc1);
		});
		form.on('select(back-time-unit)', function (data) {
			// 获取
			calc2.shelflifeField = data.value;
			//重新计算
			calc(calc2);
		});
	});

	// 切换计算器
	changeBtn.addEventListener("click", function () {
		let classNames = document.querySelector("#calc-container").classList.value;
		if (classNames.search("reverse") >= 0) {
			document.querySelector("#calc-container").classList.remove("reverse");
			this.innerHTML = "逆向计算";
		} else {
			document.querySelector("#calc-container").classList.add("reverse");
			this.innerHTML = "普通计算";
		}
	})
}