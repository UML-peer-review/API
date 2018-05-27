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
      local.hooks.hashPassword({ passwordField: 'password' }),
      async context => {
        const {code} = context.params.query;

        if (code) {
          const groups = await context.app.service('groups').find({query: {code}});

          if (!groups.length) {
            throw Error('No groups found for provided code');
          }

          context.data.role = 'student';
        } else {
          context.data.role = 'teacher';
        }
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [local.hooks.protect('password')],
    find: [],
    get: [],
    create: [
      async context => {
        const {code} = context.params.query;

        if (code) {
          context.app.service('memberships').create({userId: context.result._id}, {query: {code}});
        }
      }
    ],
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
