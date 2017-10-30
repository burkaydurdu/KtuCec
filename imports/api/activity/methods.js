Meteor.methods({

    'activity.create' : (activityObject) => {
        try {
            activitys.insert({
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
    }
});