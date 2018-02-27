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
    },
    'activity.remove': (id) => {
        try {
            imageId = activitys.findOne({
                _id: id
            }).imageId;

            if (imageId != undefined) {
                activitys.remove({
                    _id: id,
                    owner: Meteor.userId()
                }, (error, result) => {
                    if (result == 1) {
                        Images.remove({
                            _id: imageId
                        });
                    }
                });
            }
        } catch (e) {
            throw new Meteor.Error(e.error, e.reason);
        }
    },
    'activity.remove.admin': (id) => {
        try {
            imageId = activitys.findOne({
                _id: id
            }).imageId;

            if (imageId != undefined) {
                activitys.remove({
                    _id: id,
                }, (error, result) => {
                    if (result == 1) {
                        Images.remove({
                            _id: imageId
                        });
                    }
                });
            }
        } catch (e) {
            throw new Meteor.Error(e.error, e.reason);
        }
    },
    'activity.image.update': (data) => {
        try {
            imageId = activitys.findOne({
                _id: data.id
            }).imageId;

            activitys.update({
                _id: data.id
            }, {
                $set: {
                    imageId: data.imageId
                }
            }, (err) => {
                if (!err) {
                    Images.remove({
                        _id: imageId
                    });
                }
            });
        } catch (e) {
            throw new Meteor.Error(e.error, e.reason);
        }
    },
    'activity.content.update': (data) => {
        try {
            activitys.update({
                _id: data.id
            }, {
                $set: {
                    name: data.name,
                    place: data.place,
                    //  date: data.date,
                    description: data.description
                }
            }, {
                multi: true
            });

        } catch (e) {
            throw new Meteor.Error(e.error, e.reason);
        }
    }
});