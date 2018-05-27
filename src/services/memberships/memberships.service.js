// Initializes the `memberships` service on path `/memberships`
const hooks = require('./memberships.hooks');
const _pick = require('lodash/pick');
const {ObjectId: ID} = require('mongodb');

class Memberships {

  async create(data){
    const {userId, groupId} = data;

    const user = await this.Users.findOne({_id: ID(userId)});
    const group = await this.Groups.findOne({id: groupId});


    const studentInfo = _pick(user, ['_id', 'name', 'email']);
    const groupInfo = _pick(group, ['_id', 'name']);

    this.Groups.update({_id: group._id}, {$addToSet: {students: studentInfo}});
    this.Users.update({_id: ID(userId)}, {$addToSet: {groups: groupInfo}});

    return true;
  }

  async find (params) {
    const {userId, groupId} = params.query;

    if(groupId){
      const group = await this.Groups.findOne({_id: ID(groupId)});

      return group && group.students ? group.students : [];
    }

    if(userId){
      const student = await this.Users.findOne({_id: ID(userId)});
      return student && student.groups ? student.groups : [];
    }

    return [];

  }

  async update () {}
  async remove (groupId, {payload: {userId}}) {

    this.Groups.update({_id: ID(groupId)}, {$pull: {students: {_id: ID(userId)}}});
    this.Users.update({_id: ID(userId)}, {$pull: {groups: {_id: ID(groupId)}}});

    return true;
  }
  async patch () {}
  async get () {}
}

module.exports = function (app) {
  const mongoClient = app.get('mongoClient');
  // Initialize our service with any options it requires
  app.use('/memberships', new Memberships());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('memberships');

  mongoClient.then(db => {
    service.Users = db.collection('users');
    service.Groups = db.collection('groups');
  });

  service.hooks(hooks);
};
