import './index.html'


Template.alerts.helpers({
    getAlert: () => {
        alert = alerts.find({}, {
            sort: {
                createdAt: 1
            },
            skip: (Number(FlowRouter.getParam('page')) - 1) * 20,
            limit: 20
        });
        return alert == null ? false : alert.fetch();
    },
    getOwner: (id) => {
        user = Meteor.users.findOne({
            _id: id
        });
        return user === undefined ? false : user.profile.name + " " + user.profile.surname;
    },
    getAlertCount: () => {
        return alerts.find({}).count();
    }
});
Template.alerts.onRendered(function() {
    this.autorun(() => {
        this.subscribe('alerts.pub', () => {
            Tracker.afterFlush(() => {
                this.$('.collapsible').collapsible();
            });
        })
    });
});