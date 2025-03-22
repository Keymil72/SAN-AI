const moment = require('moment');

const time = require('../Formaters/Time');

//TODO - Implement logging to date files and volume in docker
function Info(message) {
    let _message = `${time.FromatForLog()} - {Info} message: ${message}`;

    console.log(_message);
}

function Error(message, stack) {
    let _message = `${time.FromatForLog()} - {Error} message: ${message} - Stack: ${stack}`;

    console.error(_message);
}


function Warn(message, stack) {
    let _message = `${time.FromatForLog()} - {Warn} message: ${message} - Stack: ${stack}`;

    console.warn(_message);
}

module.exports = { Info, Error, Warn };