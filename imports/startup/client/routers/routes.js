BlazeLayout.setRoot('body');

FlowRouter.route('/', {
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

FlowRouter.route('/aboutUs', {
    name: 'aboutUs.page',
    action: function() {
        BlazeLayout.render('default', {
            page: 'aboutUs'
        });
    },
    subscriptions: function() {
        this.register('aboutus.pub', Meteor.subscribe('aboutus.pub'));
    }
});

FlowRouter.route('/activity/:id', {
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

FlowRouter.route('/managers', {
    name: 'managers.page',
    action: function() {
        BlazeLayout.render('default', {
            page: 'managers'
        });
    },
    subscriptions: function() {
        this.register('managers.pub', Meteor.subscribe('managers.pub'));
    }
});

FlowRouter.route('/profile/:id', {
    name: 'person.page',
    action: function() {
        BlazeLayout.render('default', {
            page: 'userProfile'
        });
    },
    subscriptions: function(params) {
        this.register('user.profile.pub', Meteor.subscribe('user.profile.pub', params.id));
    }
});

FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('default', {
            page: 'notFound'
        })
    }
};