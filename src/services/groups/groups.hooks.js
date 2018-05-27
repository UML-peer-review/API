const { authenticate } = require('@feathersjs/authentication').hooks;
const _pick = require('lodash/pick');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [context => {
      const {role} = context.params.user;

      if(role === 'student'){
        throw Error('Access denied');
      }

      context.data.teacher = context.params.user._id;
      context.data.code = Math.floor(Math.random()*9999).toString().padStart(4, '0');

    }],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [context => {
      const groupInfo = _pick(context.result, ['_id', 'name']);

      context.app.service('users').update(context.result.teacher, {$push: {groups: groupInfo}});
    }],
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
