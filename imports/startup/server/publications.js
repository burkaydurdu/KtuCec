Meteor.publish("user.data.pub", function() {
    if (this.userId) {
        return Meteor.users.find({
            _id: this.userId
        });
    } else {
        return this.ready();
    }
});

Meteor.publish('activity.create.pub', () => {
    return [
        Images.find(),
        Meteor.roles.find({})
    ];

});
Meteor.publish('activity.edit.pub', (id) => {
    return [
        Images.find(),
        activitys.find({
            _id: id
        })
    ]
});

Meteor.publish('activity.single.pub', (id) => {
    return [
        activitys.find({
            _id: id
        }),
        Images.find({})
    ]
});

Meteor.publish('dashboard.pub', () => {
    return [
        Meteor.users.find({}, {
            fields: {
                profile: 1
            }
        }),
        Images.find({}),
        activitys.find({})
    ]
});
Meteor.publish('admin.dashboard.pub', () => {
    return [
        Meteor.users.find({}, {
            fields: {
                roles: 1,
                createdAt: 1
            }
        }),
        activitys.find({}, {
            fields: {
                confirmation: 1,
                date: 1
            }
        }),
        settings.find({})
    ]
});

Meteor.publish('admin.activity.pub', () => {
    return [
        Meteor.users.find({}, {
            fields: {
                profile: 1
            }
        }),
        Images.find({}),
        activitys.find({})
    ]
});

Meteor.publish('user.activity.pub', () => {
    return [
        activitys.find(), /* Buraya activit ozellestir. kendisinin yada katildigi etkinlikler diye*/
        Images.find({})
    ];
});

Meteor.publish('user.dashboard.pub', () => {
    return [
        activitys.find({}),
        Images.find({})
    ]
});

Meteor.publish('users.list.pub', () => {
    return [
        Meteor.users.find({}, {
            fields: {
                profile: 1,
                roles: 1,
                createdAt: 1
            }
        }),
        Meteor.roles.find({})
    ]
});
Meteor.publish('user.setting.pub', (id) => {
    return Images.find();
});

Meteor.publish('managers.pub', () => {
    return [
        Meteor.users.find({
            roles: {
                $in: ['manager']
            }
        }, {
            fields: {
                profile: 1,
                roles: 1
            }
        }),
        Images.find({})
    ]
});

Meteor.publish('aboutus.pub', () => {
    return settings.find({
        type: 'aboutus'
    });
});