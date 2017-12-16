adminRouter = FlowRouter.group({
    prefix: '/admin',
    name: 'admin.page',
    triggersEnter: [function(context, redirect) {
        if (!Meteor.userId()) {
            FlowRouter.go('/');
        } else if (Roles.userIsInRole(Meteor.userId(), ['user'])) {
            FlowRouter.go('user/dashboard');
        }
    }]
});

adminRouter.route('/dashboard', {
    name: 'adminDashboard.page',
    action: function() {
        BlazeLayout.render("default", {
            page: 'dashboardAdmin'
        });
    },
    subscriptions: function() {
        this.register('admin.dashboard.pub', Meteor.subscribe('admin.dashboard.pub'));
    }
});

adminRouter.route('/activity/:page', {
    name: 'adminActivity.page',
    action: function() {
        BlazeLayout.render("default", {
            page: 'activity'
        });
    },
    subscriptions: function() {
        this.register('admin.activity.pub', Meteor.subscribe('admin.activity.pub'));
    }
});

adminRouter.route('/users/list/:page', {
    name: 'users.list.page',
    action: function() {
        BlazeLayout.render('default', {
            page: 'users'
        });
    },
    subscriptions: function() {
        this.register('users.list.pub', Meteor.subscribe('users.list.pub'));
    }
});