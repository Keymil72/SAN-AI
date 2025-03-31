
// TODO - tests needed
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
        return false;
    }
}

module.exports = { isUrlValid };