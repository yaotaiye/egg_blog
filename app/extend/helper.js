/*const moment = require('moment');
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();*/
module.exports = {
    getNowTime(param) {
        function change(d) {
            if(d<10){
                return '0'+d;
            }else{
                return d
            }
        }
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + change(date.getHours()) + seperator2+ change(date.getMinutes())
            + seperator2 + change(date.getSeconds());
        return currentdate;
    }


};
