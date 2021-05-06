/*
 * @Descripttion:
 * @version:
 * @Author: @TAO
 * @Date: 2021-03-06 12:09:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-05-06 11:11:03
 */

import { dateFormat, showMsg } from "../module/util.js";

//变量
let today; //当前日期
let shelfLife; //保质期
let timeUnit = 1;//时间单位【年，月，日】
let resBox;//显示计算结果
let msgBox;//消息盒子
let keypad;//键盘
let delBtn;
let category = 1; //商品品类代码[1:常规/面包；2：酸奶]
let now = new Date(); //创建当前日期对象

// 页面加载函数
window.addEventListener("load", function () {
	//获取页面dom元素
	today = document.querySelector("input#today");
	shelfLife = document.querySelector("input#shelf-life"); //保质期
	resBox = document.querySelectorAll("#form-content input#production")[0];//显示计算结果
	keypad = document.querySelector("#calc-keypad");//键盘
	msgBox = document.querySelector("#msg-box");//消息盒子
	now = new Date(); //当前日期
	delBtn = document.querySelector("#calc-keypad .del-btn");//删除按钮

	//layui模块化
	layui.use(['laydate', 'form', 'layer'], function () {
		//模块加载
		const laydate = layui.laydate;
		const form = layui.form;
		const layer = layui.layer;

		//功能模块
		//修改当前日期
		laydate.render({
			elem: '#today'
			, done: function (value, date, endDate) {
				now = new Date(value); //重新给now赋值
				calc(); //重新计算
			}
		});

		//修改保质期时间的单位
		form.on('select(time-unit)', function (data) {
			//逻辑处理
			const element = data.elem;
			// 获取
			timeUnit = data.value;
			let msg = {
				'1': '日',
				'30': '月',
				'365': '年'
			}
			showMsg('切换为' + msg[timeUnit], 'ok', layer.msg);
			//重新计算
			calc();
		});
		//修改商品品类
		form.on('select(category)', function (data) {
			//逻辑处理
			const element = data.elem;
			category = Number.parseInt(element.value);//修改商品品类代码
			const msg = '切换为' + (category == 1 ? '常温' : '冷藏');
			// layer.msg(`修改了商品品类为${data.value}`);
			showMsg(msg, 'ok', layer.msg);
			//重新计算
			calc();
		});

		//关闭消息
		document.querySelector('#msg-box').addEventListener('click', function (event) {
			if (event.target.className == 'msg-close') {//如果是单击了关闭按钮，关闭当前消息
				event.target.parentElement.classList.remove('msg-show');
				setTimeout(() => {
					event.target.parentElement.remove();
				}, 200);
			}
		});
	});

	// 初始化当前日期
	today.value = dateFormat(now);

	//给数字按键添加点击事件
	keypad.addEventListener("click", function () {
		let element = event.target;//事件dom
		let classNames = element.getAttribute("class");//element的class属性
		classNames = ["", null].includes(classNames) ? element.parentElement.getAttribute("class") : classNames;
		if (["SPAN", "A"].includes(element.nodeName) && classNames.includes("num-btn")) {//数字按键
			var str = String(shelfLife.value) + String(element.innerText);
			shelfLife.value = Number.parseInt(str);
			calc();
		}
	});

	//删除保质期
	delBtn.addEventListener("click", function () {
		shelfLife.value = "";
		resBox.value = "";
	})

});

/**
 * 计算保质期
 * @returns 计算结果
 */
function calc() {
	let dayLength = shelfLife.value * timeUnit; //保质期天数
	//无效保质期
	if ([null, undefined, "", 0].includes(dayLength)) {
		return;
	} else if (dayLength < 2) {
		//showMsg('保质期应>=2', 'err', msgBox);
		return;
	}
	//计算生产日期
	let date = new Date(now.getTime() - (dayLength - category) * 86400000);
	resBox.value = dateFormat(date);
}



// 清空结果
function clearInput() {
	// 清空生产日期
	resBox.value = "";
}
