mutualRouter = FlowRouter.group({
    prefix: '/m',
    name: 'mutual.page',
    triggersEnter: [function(context, redirect) {
        if (!Meteor.userId()) {
            FlowRouter.go('/');
        }
    }]
});

mutualRouter.route('/activity/create', {
    name: 'activitCreate.page',
    action: function() {
        BlazeLayout.render("default", {
            page: 'activityCreate'
        });
    },
    subscriptions: function() {
        this.register('activity.create.pub', Meteor.subscribe('activity.create.pub'));
    }
});