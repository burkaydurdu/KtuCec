import './index.html'

Template.singleActivity.helpers({
    data: () => {
        return activitys.findOne({
            _id: FlowRouter.getParam('id')
        });
    },
    getImage: (id) => {
        image = Images.find({
            _id: id
        });
        return image === null ? false : image;
    },
    getUser: (id) => {
        user = Meteor.users.findOne({
            _id: id
        });
        return user === null ? false : user.profile;
    }
});

Template.singleActivity.onRendered(function() {
    this.autorun(() => {
        this.subscribe('user.dashboard.pub', () => {
            Tracker.afterFlush(() => {
                this.$('.materialboxed').materialbox();
            });
        })
    });
});