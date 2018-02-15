import './index.html'

Template.userProfile.onCreated(function() {
    this.allCreatedActivity = new ReactiveVar(false);
    this.alljoinedActivity = new ReactiveVar(false);
});

Template.userProfile.helpers({
    user: () => {
        return Meteor.users.findOne({
            _id: FlowRouter.getParam('id')
        });
    },
    createdActivityCount: () => {
        return activitys.find({
            owner: FlowRouter.getParam('id'),
            confirmation: true
        }).count();
    },
    joinedActivityCount: () => {
        return activitys.find({
            join: {
                $in: [FlowRouter.getParam('id')]
            }
        }).count();
    },
    alertCount: () => {
        return alerts.find({
            owner: FlowRouter.getParam('id')
        }).count();
    },
    myActivity: () => {
        activity = activitys.find({
            owner: FlowRouter.getParam('id'),
            confirmation: true
        }, {
            limit: 6
        });
        return activity.count() === 0 ? false : activity.fetch();
    },
    myJoined: () => {
        activity = activitys.find({
            join: {
                $in: [FlowRouter.getParam('id')]
            }
        }, {
            limit: 6
        });
        return activity.count() === 0 ? false : activity.fetch();
    },
    myAlert: () => {
        alert = alerts.find({
            owner: FlowRouter.getParam('id')
        });
        return alert == null ? false : alert.fetch();
    },
    allMyActivity: () => {
        activity = activitys.find({
            owner: FlowRouter.getParam('id'),
            confirmation: true
        });
        return activity.count() === 0 ? false : activity.fetch();
    },
    allMyJoined: () => {
        activity = activitys.find({
            join: {
                $in: [FlowRouter.getParam('id')]
            }
        });
        return activity.count() === 0 ? false : activity.fetch();
    },
    getImage: (id) => {
        image = Images.find({
            _id: id
        });
        return image === null ? false : image;
    },
    allCreatedActivity: () => {
        return Template.instance().allCreatedActivity.get() == true;
    },
    alljoinedActivity: () => {
        return Template.instance().alljoinedActivity.get() == true;
    }
});

Template.userProfile.events({
    "click #allCreated": (event, template) => {
        template.allCreatedActivity.set(!template.allCreatedActivity.get());
    },
    "click #allJoined": (event, template) => {
        template.alljoinedActivity.set(!template.alljoinedActivity.get());
    }
});

Template.userProfile.onRendered(function() {
    this.autorun(() => {
        this.subscribe('user.profile.pub', () => {
            Tracker.afterFlush(() => {
                this.$('.materialboxed').materialbox();
                this.$('ul.tabs').tabs();
            });
        })
    });
});