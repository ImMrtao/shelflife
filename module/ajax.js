const Ajax = {
    /**
     * 
     * @param {String} url 
     * @param {Function} fn 回调函数
     * @param {Boolean} async 是否异步
     */
    get: function (url, fn, async) {
        // XMLHttpRequest对象用于在后台与服务器交换数据   
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, async);
        xhr.onreadystatechange = function () {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 从服务器获得数据 
                fn.call(this, xhr.responseText);
            }
        }
        xhr.send();
    },
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    /**
     * 
     * @param {String} url
     * @param {String} data 请求参数
     * @param {Function} fn 回调函数
     * @param {Boolean} async 是否异步
     */
    post: function (url, data, fn, async) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, async);
        // 添加http头，发送信息至服务器时内容编码类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                fn.call(this, xhr.responseText);
            }
        }
        xhr.send(data);
    }
}

export { Ajax as default };