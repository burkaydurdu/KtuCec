import './index.html'

Template.navBar.events({
    'click #logout' : () => {
        if(Meteor.user()) {
            Meteor.logout( function () {
                FlowRouter.go('/');
            });
        }
    }
});
