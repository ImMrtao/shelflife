import { dateFormat } from "./util.js"

/**
 * 计算类构造器
 * @param {Document} calc 计算器
 * @param {Element} basedate 过期日期
 * @param {Element} shelfLife 保质期
 * @param {Element} currentInput 当前选中输入框
 * @param {Number} shelflifeField 时间单位
 * @param {Element} resBox 显示结果
 * @param {Element} keypad 键盘
 * @param {Element} delBtn 删除按钮
 * @param {Element} fallbackday 提前天数
 * @param {Date} now 当前时间
 */
function Calc(calc, basedate, shelfLife, currentInput, shelflifeField, resBox, keypad, delBtn, fallbackday, now, mode) {
    this.calc = calc;
    this.basedate = basedate;
    this.shelfLife = shelfLife;
    this.currentInput = currentInput;
    this.shelflifeField = shelflifeField;
    this.resBox = resBox;
    this.keypad = keypad;
    this.delBtn = delBtn;
    this.fallbackday = fallbackday;
    this.now = now;
    this.mode = mode;
}

Calc.prototype.events = function () {
    let _this = this;
    this.keypad.addEventListener("click", function (event) {
        let btn = event.target;
        console.log(btn.innerText);
        let currentInput = _this.currentInput;
        let classNames = btn.getAttribute("class");//element的class属性
        classNames = ["", null].includes(classNames) ? btn.parentElement.getAttribute("class") : classNames;
        if (["SPAN", "A"].includes(btn.nodeName) && classNames.includes("num-btn")) {//数字按键
            var str = String(currentInput.value) + String(btn.innerText);
            currentInput.value = Number.parseInt(str);
            _this.calculation();
        }
    });

    this.calc.querySelector(".form").addEventListener("click", function (event) {
        let formItem = event.target;
        let focusInput = _this.currentInput;//当前计算器的选中输入框
        let classNames = formItem.classList.value;//class属性值
        if (classNames.search("shelflife") >= 0 || classNames.search("fallbackday") >= 0) {//只有保质期和提前天数的输入框才有效
            _this.calc.querySelector(".isfocus").classList.remove("isfocus");
            focusInput = _this.calc.querySelector(`.${classNames.search("shelflife") >= 0 ? "shelflife" : "fallbackday"}`);
            focusInput.classList.add("isfocus");
            _this.currentInput = focusInput;
        }
    });

    this.delBtn.addEventListener("click", function () {
        _this.currentInput.value = "";
        _this.resBox.value = "";
        _this.calculation();
    });
}

Calc.prototype.calculation = function () {
    let days = this.shelfLife.value * this.shelflifeField;//天数
    let fallbackday = this.fallbackday.value;//提前天数
    let baseDate = new Date(this.basedate.value);//当前日期
    //保质期为无效值
    if ([null, undefined, "", 0].includes(days)) {
        return;
    } else if (days < 2) {//保质期天数小于2天
        return;
    } else if (Number.parseInt(fallbackday) >= days) {
        return;
    }
    //计算生产日期
    let date = new Date(baseDate.getTime() - ((days - 1 - fallbackday) * 86400000 * this.mode));
    this.resBox.value = dateFormat(date);
}

function getData(calcSelector) {
    let data = {
        calc: document.querySelector(`${calcSelector}`),
        basedate: document.querySelector(`${calcSelector} .basedate`),
        shelflife: document.querySelector(`${calcSelector} .shelflife`),
        currentInput: document.querySelector(`${calcSelector} .isfocus`),
        //shelflifeField:1,
        resBox: document.querySelector(`${calcSelector} .result-input`),
        keypad: document.querySelector(`${calcSelector} .keypad`),
        delBtn: document.querySelector(`${calcSelector} .fn-btn.del-btn`),
        fallbackday: document.querySelector(`${calcSelector} .fallbackday`),
        now: new Date()
    };
    return data;
}

/**
 * 
 * @param {String} calcSelector 选择器
 * @returns 
 */
function createCalc(calcSelector) {
    let calcData = getData(calcSelector);
    let mode = calcSelector === ".calc.front" ? 1 : -1;
    return new Calc(calcData.calc, calcData.basedate, calcData.shelflife, calcData.currentInput, 1, calcData.resBox, calcData.keypad, calcData.delBtn, calcData.fallbackday, new Date(), mode);
}

export { Calc, getData, createCalc };