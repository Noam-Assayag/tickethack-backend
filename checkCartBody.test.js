const { checkCartBody } = require('./modules/checkCartBody');

it('Valid body with _id', () => {
    const result = checkCartBody({ _id: 'abc123', departure: 'Paris', arrival: 'Lyon' });
    expect(result).toBe(true);
});

it('Invalid body without _id', () => {
    const result = checkCartBody({ departure: 'Paris', arrival: 'Lyon' });
    expect(result).toBe(false);
});