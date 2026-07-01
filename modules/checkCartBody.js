function checkCartBody(body) {
    if (!body._id) {
        return false;
    }
    return true;
}

module.exports = { checkCartBody };