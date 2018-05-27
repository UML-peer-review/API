const users = require('./users/users.service.js');
const groups = require('./groups/groups.service.js');

const memberships = require('./memberships/memberships.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(groups);
  app.configure(memberships);
};
