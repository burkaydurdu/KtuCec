import './index.html'

Template.navBar.events({
    'click #logout' : function (event) {
        if(Meteor.user()) {
            Meteor.logout();
            FlowRouter.go('/');
        }
    }
});