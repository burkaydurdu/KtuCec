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
   }
});

userRouter.route('/activity/create', {
    name: 'activitCreate.page',
    action: function () {
        BlazeLayout.render("default", {page: 'activityCreate'});
    },
    subscriptions: function(){
        this.register('activity.create.pub', Meteor.subscribe('activity.create.pub'));
    }
});