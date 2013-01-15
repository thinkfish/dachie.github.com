// ==UserScript==
// @name          yearVip
// @namespace     http://www.dachie.com/userscript/
// @description   QQ年费会员每日礼包 自动抽奖脚本
// @include       http://vip.qq.com/clubact/2011/year_gift/*
// @license			Public Domain
// @developer		Dachie
// @version 		1.0.1
// @updateURL		http://www.dachie.com/userscript/yearVip.user.js
// ==/UserScript==
window.onload = function () {
    var __init = function () {
        (function () {
            var i = 0, l = 5, one, two;
            one = setInterval(function () {
                var I = document.querySelectorAll(".v_mod_btn2[onclick]")[i];
                I.click();
                GM_log("已完成任务编号：" + I.getAttribute("onclick").replace(/[^\d+]/g, ''));
                i = i + 1;
                two = setTimeout(function () {
                    document.querySelector("button[id^=qqvip_ui_dialog_close]").click();
                    if (i >= l) {
                        alert("今日抽奖完成！");
                        clearInterval(one);
                        clearTimeout(two);
                    }
                }, 1000);
            }, 2000);
        })(window);
    };
    __init();
};
