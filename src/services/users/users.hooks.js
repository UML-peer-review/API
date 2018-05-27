const authentication = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');

module.exports = {
  before: {
    all: [],
    find: [
      authentication.hooks.authenticate('jwt')
    ],
    get: [],
    create: [
      local.hooks.hashPassword({ passwordField: 'password' })
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [local.hooks.protect('password')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
