function checkBookingBody(body) {
    if (!body.trips || !Array.isArray(body.trips) || body.trips.length === 0) {
        return false;
    }
    return true;
}

module.exports = { checkBookingBody };