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
        Images.find({}),
        Meteor.users.find({}, {
            fields: {
                profile: 1
            }
        })
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
        activitys.find({
            confirmation: true
        }),
        alerts.find({})
    ]
});
Meteor.publish('admin.dashboard.pub', () => {
    return [
        Meteor.users.find({}, {
            fields: {
                roles: 1,
                createdAt: 1,
                profile: 1
            }
        }),
        activitys.find({}, {
            fields: {
                confirmation: 1,
                date: 1
            }
        }),
        settings.find({}),
        alerts.find({})
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

Meteor.publish('user.profile.pub', (id) => {
    return [
        Meteor.users.find({
            _id: id
        }),
        Images.find({}),
        activitys.find({
            $or: [{
                owner: id
            }, {
                join: {
                    $in: [id]
                }
            }],
            confirmation: true
        }),
        alerts.find({
            owner: id
        })
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
        Images.find({}),
        alerts.find({
            owner: Meteor.userId()
        })
    ]
});

Meteor.publish('users.list.pub', () => {
    return [
        Meteor.users.find({}, {
            fields: {
                emails: 1,
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

Meteor.publish('alerts.pub', () => {
    return [
        alerts.find({}),
        Meteor.users.find({}, {
            fields: {
                profile: 1
            }
        }),
    ]
});

Meteor.publish('aboutus.pub', () => {
    return settings.find({
        type: 'aboutus'
    });
});