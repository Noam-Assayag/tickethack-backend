function checkCartBody(body) {
    return (
        body.tripId &&
        body.departure &&
        body.arrival &&
        body.date &&
        body.price
    );
}

module.exports = { checkCartBody };