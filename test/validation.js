const assert = require('assert');
const User = require('../src/user');


describe('Validating record', () => {
    it('requires a user name ', () => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message == 'Name is required.');
    });

    it('Requires a user name longer  thea 2 characters ', () => {
        const user = new User({ name: 'Al' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message == 'Name must be longer then 2 characters.');
    });

    it('disallows invalid records from being saved', (done) => {
        const user = new User({ name: 'Al' });
        user.save()
            .catch(validationResult => {
                const { message } = validationResult.errors.name;
                assert(message == 'Name must be longer then 2 characters.');
                done();
            });
    })
});