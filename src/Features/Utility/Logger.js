const time = require('../Formaters/Time');

//TODO - Implement logging to date files and volume in docker
function LogInfo(message) {
    let _message = `${time.FromatForLog()} - {Info} message: ${message}`;

    console.log(_message);
}

function LogError(message, stack) {
    let _message = `${time.FromatForLog()} - {Error} message: ${message} - Stack: ${stack}`;

    console.error(_message);
}


function LogWarn(message, stack) {
    let _message = `${time.FromatForLog()} - {Warn} message: ${message} - Stack: ${stack}`;

    console.warn(_message);
}

module.exports = { LogInfo, LogError, LogWarn };