Meteor.methods({
  'activity.create': (activityObject) => {
    try {
      activitys.insert({
        createdAt: activityObject.createdAt,
        imageId: activityObject.imageId,
        name: activityObject.name,
        date: activityObject.date,
        place: activityObject.place,
        description: activityObject.description,
        owner: Meteor.userId(),
        confirmation: Roles.userIsInRole(Meteor.userId(), 'admin') === true
      });
    } catch (e) {
      throw new Meteor.Error(300, "cant create document");
    }
  },
  'activity.join': (id) => {
    try {
      activitys.update({
        _id: id
      }, {
        $addToSet: {
          join: Meteor.userId()
        }
      });
    } catch (e) {
      throw new Meteor.Error(301, "cant join activity");
    }
  },
  'activity.confirm': (id) => {
    try {
      activitys.update({
        _id: id
      }, {
        $set: {
          confirmation: true
        }
      });
    } catch (e) {
      throw new Meteor.Error(301, "error");
    }
  }
});
