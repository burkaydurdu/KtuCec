import './index.html'

Template.dashboardUser.helpers({
    user: () => {
        return Meteor.user();
    },
    createdActivityCount: () => {
        return activitys.find({
            owner: Meteor.userId()
        }).count();
    },
    joinedActivityCount: () => {
        return activitys.find({
            join: {
                $in: [Meteor.userId()]
            }
        }).count();
    },
    alertCount: () => {
        return alerts.find({
            owner: Meteor.userId()
        }).count();
    },
    myActivity: () => {
        activity = activitys.find({
            owner: Meteor.userId()
        }, {
            limit: 6
        });
        return activity.count() === 0 ? false : activity.fetch();
    },
    myJoined: () => {
        activity = activitys.find({
            join: {
                $in: [Meteor.userId()]
            }
        }, {
            limit: 6
        });
        return activity.count() === 0 ? false : activity.fetch();
    },
    myAlert: () => {
        alert = alerts.find({
            owner: Meteor.userId()
        });
        return alert == null ? false : alert.fetch();
    },
    getImage: (id) => {
        image = Images.find({
            _id: id
        });
        return image === null ? false : image;
    }
});

Template.dashboardUser.events({
    "click #allCreated": (event) => {
        Session.set('showActivitData', 'created');
        FlowRouter.go("/user/activity/1");
    },
    "click #allJoined": (event) => {
        Session.set('showActivitData', 'joined');
        FlowRouter.go("/user/activity/1");
    }
});

Template.dashboardUser.onRendered(function() {
    this.autorun(() => {
        this.subscribe('user.dashboard.pub', () => {
            Tracker.afterFlush(() => {
                this.$('.materialboxed').materialbox();
                this.$('ul.tabs').tabs();
            });
        })
    });
});