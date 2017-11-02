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

adminRouter.route('/activity', {
    name: 'adminActivity.page',
    action: function () {
        BlazeLayout.render("default", {page: 'activity'});
    },
    subscriptions: function(){
        this.register('admin.activity.pub', Meteor.subscribe('admin.activity.pub'));
    }
});

