Meteor.publish('activity.create.pub', () => {
    return Images.find();
});
Meteor.publish('dashboard.pub', () => {
    return [
        Meteor.users.find({},{
            fields :{
               profile: 1
            }
        }),
        Images.find({}),
        activitys.find({})
    ]
});