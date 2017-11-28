userRouter = FlowRouter.group({
    prefix: '/user',
    name: 'admin.page',
    triggersEnter: [function (context, redirect) {
        if(!Meteor.userId()) {
            FlowRouter.go('/');
        } else if(Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            FlowRouter.go('admin/dashboard');
        }
    }]
});

userRouter.route('/dashboard', {
    name: 'userDashboard.page',
    action: function () {
        BlazeLayout.render("default", {page: 'dashboardUser'});
    },
    subscriptions: function(){
        this.register('user.dashboard.pub', Meteor.subscribe('user.dashboard.pub'));
    }
});

userRouter.route('/activity/:page', {
    name: 'userActivity.page',
    action: function () {
        BlazeLayout.render("default", {page: 'activityShow'});
    },
    subscriptions: function() {
        this.register('user.activity.pub', Meteor.subscribe('user.activity.pub'));
    }
})
