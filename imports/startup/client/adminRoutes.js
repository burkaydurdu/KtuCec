adminRouter = FlowRouter.group({
    prefix: '/admin',
    name: 'admin.page',
    triggersEnter: [function (context, redirect) {
        if(!Meteor.userId()) {
            FlowRouter.go('/');
        } else if(Roles.userIsInRole(Meteor.userId(), ['user'])) {
            FlowRouter.go('user/dashboard');
        }
    }]
});

adminRouter.route('/dashboard', {
    name: 'adminDashboard.page',
    action: function () {
        BlazeLayout.render("default", {page: 'dashboardAdmin'});
    }
});

adminRouter.route('/activity/create', {
    name: 'activitCreate.page',
    action: function () {
        BlazeLayout.render("default", {page: 'activityCreate'});
    },
    subscriptions: function(){
        this.register('activity.create.pub', Meteor.subscribe('activity.create.pub'));
    }
});