/*
 *                        .::::.
 *                      .::::::::.
 *                     :::::::::::
 *                  ..:::::::::::'
 *               '::::::::::::'
 *                 .::::::::::
 *            '::::::::::::::..
 *                 ..::::::::::::.
 *               ``::::::::::::::::
 *                ::::``:::::::::'        .:::.
 *               ::::'   ':::::'       .::::::::.
 *             .::::'      ::::     .:::::::'::::.
 *            .:::'       :::::  .:::::::::' ':::::.
 *           .::'        :::::.:::::::::'      ':::::.
 *          .::'         ::::::::::::::'         ``::::.
 *      ...:::           ::::::::::::'              ``::.
 *     ````':.          ':::::::::'                  ::::..
 *                        '.:::::'                    ':'````..
 * 
 * @Descripttion: 
 * @version: 
 * @Author: @TAO
 * @Date: 2021-04-28 13:00:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-05-06 12:19:35
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
function showMsg(msg, type, fn) {
    //弹出信息
    // let eleMsg = document.createElement('h4');//消息
    // let closeMsg = document.createElement('span');
    // //设置消息
    // eleMsg.classList.add('msg', `${type}`);
    // eleMsg.innerHTML = msg;
    // //设置关闭按钮
    // closeMsg.innerHTML = '×';
    // closeMsg.classList.add('msg-close');
    // eleMsg.appendChild(closeMsg);
    // container.appendChild(eleMsg);
    // eleMsg.classList.add('msg-show');
    // // 3秒后隐藏信息
    // setTimeout(() => {
    //     eleMsg.classList.remove('msg-show');
    //     setTimeout(() => {
    //         eleMsg.remove();
    //     }, 200);//200毫秒之后删除这条消息
    // }, 3000);
    fn(msg, {
        icon: 1
        // ,
        // time: 2000 //2秒关闭（如果不配置，默认是3秒）
    });

}

//对外暴露接口
export { dateFormat, formatNumber, showMsg };