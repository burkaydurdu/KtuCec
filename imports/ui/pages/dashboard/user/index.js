import './index.html'

Template.dashboardUser.helpers({
    user : () => {
        return Meteor.user();
    },
    createdActivityCount : () => {
        return activitys.find({owner: Meteor.userId()}).count();
    },
    myActivity: () => {
        activity = activitys.find(({owner: Meteor.userId()}));
        return activity.count() === 0 ? false : activity.fetch();
    },
    getImage: (id) => {
        image = Images.find({_id: id});
        return image === null ? false : image;
    },
});

Template.dashboardUser.onRendered( function() {
    this.autorun( () => {
        this.subscribe('dashboard.user.pub', () => {
            Tracker.afterFlush( () => {
                this.$('.materialboxed').materialbox();
                this.$('ul.tabs').tabs();
            });
        })
    });
});