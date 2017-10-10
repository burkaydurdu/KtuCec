userRouter = FlowRouter.group({
    prefix: '/user',
    name: 'default.page',
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
    }
});