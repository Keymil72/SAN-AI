const logger = require("./Logger");

async function isUrlValid(url) {
    if (!isValidURL(url)) return false;

    const isReachable = await isUrlReachable(url);

    return isReachable;

}

async function isUrlReachable(url){
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        logger.LogError(error.message, error.stack);
        return false;
    }
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    }
    catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return false;
    }
}

module.exports = { isUrlValid };