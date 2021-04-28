/*
 * @Descripttion:
 * @version:
 * @Author: @TAO
 * @Date: 2021-04-26 10:50:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-27 12:17:15
 */
/**
 * 格式化日期
 * @param {*} date 要格式化的日期
 * @returns 格式化结果
 */
function dateFormat(date) {
    // 初始化当前日期
    var yy = formatNumber(date.getFullYear());
    var mm = formatNumber(date.getMonth() + 1);
    var dd = formatNumber(date.getDate());
    let str = `${yy}-${mm}-${dd}`;
    //返回格式化结果
    return `${yy}-${mm}-${dd}`;
}


/**
 * 
 * @param {Number} num 待格式化数字
 * @returns 格式化结果
 */
function formatNumber(num) {
    return (num > 9 ? "" : "0") + num;
}

/**
 * 显示消息
 * @param {String} msg 消息内容
 * @param {String} type 消息类别 ok提示执行结果，err错误提示，info提示建议
 * @param {Object} container 显示消息的容器
 */
function showMsg(msg, type, container) {
    //弹出信息
    container.classList.add('msg-show');
    container.innerHTML = `<h4 class='msg ${type}'>${msg}</h4>`;
    // 3秒后隐藏信息
    setTimeout(() => {
        container.classList.remove('msg-show');
    }, 3000);
    return;
}

//对外暴露接口
export { dateFormat, formatNumber, showMsg };