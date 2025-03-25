const moment = require("moment-timezone");

function FormatToWarsaw(timeStamp) {
    let _dateTime = moment(timeStamp);

    if (_dateTime.isValid()) {
        return moment(timeStamp)
            .tz("Europe/Warsaw")
            .format("HH:mm DD.MM.YYYY");
    }else{
        return moment()
            .tz("Europe/Warsaw")
            .format("HH:mm DD.MM.YYYY");
    }
}

function FromatForLog() {
    let _time = moment().format('HH:mm:ss');
    let _date = moment().format('DD.MM.YYYY');
    let _dateTime = `(${_time}) [${_date}]`;

    return _dateTime;
}

module.exports = { FormatToWarsaw, FromatForLog };