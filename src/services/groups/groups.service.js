// Initializes the `groups` service on path `/groups`
const createService = require('feathers-mongodb');
const hooks = require('./groups.hooks');

module.exports = function (app) {
  const mongoClient = app.get('mongoClient');

  // Initialize our service with any options it requires
  app.use('/groups', createService({}));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('groups');

  mongoClient.then(db => {
    service.Model = db.collection('groups');
  });

  service.hooks(hooks);
};
