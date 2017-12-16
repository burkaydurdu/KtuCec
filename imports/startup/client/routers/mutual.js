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
    name: 'activityCreate.page',
    action: function() {
        BlazeLayout.render("default", {
            page: 'activityCreate'
        });
    },
    subscriptions: function() {
        this.register('activity.create.pub', Meteor.subscribe('activity.create.pub'));
    }
});

mutualRouter.route('/activity/edit/:id', {
    name: 'activityEdit.page',
    action: function() {
        BlazeLayout.render("default", {
            page: 'activityEdit'
        });
    },
    subscriptions: function(params) {
        this.register('activity.edit.pub', Meteor.subscribe('activity.edit.pub', params.id));
    }
});