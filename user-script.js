// ==UserScript==
// @name         whale auto clockin
// @namespace    http://tampermonkey.net/
// @version      1.0-20240220
// @description
// @author       bbsobad
// @match        https://whale-auto-clockin.pages.dev/
// @match        http://eip.apacoe.com.tw/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() => {
        const now = new Date();
        const isClockTime = needClock(now, setting.clockin, setting.clockout);
        const form = document.getElementById('frmSSSI01');
        if (form && isClockTime) {
            const eid = document.getElementById('txteid');
            const name = document.getElementById('txtname');
            const dept = document.getElementById('txtdept');
            const date = document.getElementById('txtdate');
            const time = document.getElementById('txttime');

            eid.value = setting.eid;
            name.value = setting.name;
            dept.value = setting.dept;
            date.value = `${now.getFullYear()}${prefixZero(now.getMonth()+1)}${prefixZero(now.getDate())}`;
            if (isClockTime === 'in') {
                time.value = prefixZero(setting.clockin - randomNumber(1, setting.randomRange), 4);
            } else if (isClockTime === 'out') {
                time.value = prefixZero(setting.clockout + randomNumber(1, setting.randomRange), 4);
            }
            form.submit();
        }
    }, 60000);
})();

const setting = {
    eid: '02011',
    name: '楊靖羽',
    dept: '電路二',
    clockin: 845,
    clockout: 1745,
    randomRange: 10
};

const needClock = (now, inTime, outTime) => {
    const currentTime = `${prefixZero(now.getHours())}${prefixZero(now.getMinutes())}`;
    if (currentTime === prefixZero(inTime, 4)) {
        return 'in';
    } else if (currentTime === prefixZero(outTime, 4)) {
        return 'out';
    }
    return null;
}

const prefixZero = (num, digital = 2) => {
    let str = `${num}`;
    while (str.length < digital) {
        str = `0${str}`
    }
    return str;
}

const randomNumber = (min, max) => Math.floor(Math.random() * max) + min;
