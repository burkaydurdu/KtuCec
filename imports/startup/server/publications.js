Meteor.publish("user.data.pub", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId});
    } else {
        return this.ready();
    }
});

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

Meteor.publish('admin.activity.pub', () => {
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

Meteor.publish('dashboard.user.pub', () => {
   return [
       activitys.find({}),
       Images.find({})
   ]
});