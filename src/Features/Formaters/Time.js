const moment = require("moment-timezone");

const logger = require("../Utility/Logger");

function FormatToWarsaw(timeStamp) {
    try {
        let _dateTime = moment(timeStamp)
            .tz("Europe/Warsaw")
            .format("HH:mm DD.MM.YYYY");

        return _dateTime;
    } catch (ex) {
        logger.Error(ex.message, ex.stack);

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