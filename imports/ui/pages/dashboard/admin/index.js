import './index.html'

Template.dashboardAdmin.helpers({
    usersData: () => {
        totalMember = Meteor.users.find({}).count();
        totalAdmin = Meteor.users.find({
            roles: {
                $in: ['admin']
            }
        }).count();
        totalUser = Meteor.users.find({
            roles: {
                $in: ['user']
            }
        }).count();
        toDay = moment();
        sevenDaysBefore = moment().subtract(7, "days");
        totalLastSeven = Meteor.users.find({
            createdAt: {
                $gte: new Date(sevenDaysBefore),
                $lte: new Date(toDay)
            }
        }).count();
        return {
            totalMember: totalMember,
            totalAdmin: totalAdmin,
            totalUser: totalUser,
            totalLastSeven: totalLastSeven
        }
    },
    activitysData: () => {
        totalActivity = activitys.find({}).count();
        notConfirmActivity = activitys.find({
            confirmation: false
        }).count();

        toDay = moment();
        featureActivity = activitys.find({
            $and: [{
                    date: {
                        $gt: new Date(toDay)
                    }
                },
                {
                    confirmation: true
                }
            ]
        }).count();
        completeActivity = activitys.find({
            $and: [{
                    date: {
                        $lt: new Date(toDay)
                    }
                },
                {
                    confirmation: true
                }
            ]
        }).count();
        return {
            totalActivity: totalActivity,
            notConfirmActivity: notConfirmActivity,
            featureActivity: featureActivity,
            completeActivity: completeActivity
        }
    },
    'aboutUs': () => {
        setting = settings.findOne({
            type: 'aboutus'
        });
        return setting != undefined ? setting.content.about : false;
    }
});

Template.dashboardAdmin.events({
    'submit form#aboutUsForm': (event) => {
        event.preventDefault();
        const aboutUs = event.target.aboutUs.value;
        data = {
            type: 'aboutus',
            content: {
                about: aboutUs
            }
        }
        Meteor.call('setting.create', data, (err, res) => {
            if (!err) {
                Materialize.toast('Kayit Basarili', 2500, 'green white-text');
            } else {
                Materialize.toast('Bir Sorun Olustu!', 2500, 'red white-text');
            }
        });
    }
})

Template.dashboardAdmin.onRendered(function() {
    this.autorun(() => {
        this.subscribe('admin.dashboard.pub', () => {
            Tracker.afterFlush(() => {
                Materialize.updateTextFields();
            });
        })
    });
});