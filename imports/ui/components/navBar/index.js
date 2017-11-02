import './index.html'

Template.navBar.events({
    'click #logout' : function (event) {
        if(Meteor.user()) {
            Meteor.logout( function () {
                FlowRouter.go('/');
            });
        }
    }
});

Template.navBar.onRendered(function () {
    this.autorun( () => {
        this.subscribe('userData', () => {
            Tracker.afterFlush(() => {
                this.$(".dropdown-button").dropdown({
                    constrainWidth: false
                });
            });
        });
    });
});