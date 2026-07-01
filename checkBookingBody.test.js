const { checkBookingBody } = require('./modules/checkBookingBody');

it('Valid body with trips', () => {
    const result = checkBookingBody({ trips: [{ departure: 'Paris', arrival: 'Lyon' }] });
    expect(result).toBe(true);
});

it('Invalid body without trips', () => {
    const result = checkBookingBody({});
    expect(result).toBe(false);
});

it('Invalid body with empty trips array', () => {
    const result = checkBookingBody({ trips: [] });
    expect(result).toBe(false);
});