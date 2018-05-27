const assert = require('assert');
const app = require('../../src/app');

describe('\'memberships\' service', () => {
  it('registered the service', () => {
    const service = app.service('memberships');

    assert.ok(service, 'Registered the service');
  });
});
