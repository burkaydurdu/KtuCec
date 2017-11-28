BlazeLayout.setRoot('body');

defaultRouter = FlowRouter.group({
    prefix: '',
    name: 'default.page',
    triggersEnter: [function(context, redirect) {

    }]
});

defaultRouter.route('/', {
    name: 'dashboard.page',
    action: function() {
        BlazeLayout.render('default', {
            page: 'dashboard'
        })
    },
    subscriptions: function() {
        this.register('dashboard.pub', Meteor.subscribe('dashboard.pub'));
    }
});

defaultRouter.route('/aboutUs', {
    name: 'aboutUs.page',
    action: function() {
        BlazeLayout.render('default', {
            page: 'aboutUs'
        });
    },
    subscriptions: function() {
        this.register('aboutus.pub', Meteor.subscribe('aboutus.pub'));
    }
})

defaultRouter.route('/activity/:id', {
    name: 'activity.single.page',
    action: function() {
        BlazeLayout.render('default', {
            page: 'singleActivity'
        });
    },
    subscriptions: function(params) {
        this.register('activity.single.pub', Meteor.subscribe('activity.single.pub', params.id));
    }
});

FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('default', {
            page: 'notFound'
        })
    }
};