BlazeLayout.setRoot('body');

defaultRouter = FlowRouter.group({
    prefix: '',
    name: 'default.page',
    triggersEnter: [function (context, redirect) {
        Meteor.autorun(function () {
        if(Meteor.userId()) {
            if(Roles.userIsInRole(Meteor.userId(), ['user'])) {
                FlowRouter.go('/user/dashboard');
            } else if(Roles.userIsInRole(Meteor.userId(), ['admin'])) {
                FlowRouter.go('/admin/dashboard');
            }
        }
        });
    }]
});

defaultRouter.route('/', {
    name: 'dashboard.page',
    action: function () {
        BlazeLayout.render('default', {page: 'dashboard'})
    },
    subscriptions: function(){
        this.register('dashboard.pub', Meteor.subscribe('dashboard.pub'));
    }
});

defaultRouter.route('/login', {
    name: 'login.page',
    action: function () {
        BlazeLayout.render('default', {page: 'login'})
    }
});

defaultRouter.route('/register', {
    name: 'register.page',
    action: function () {
        BlazeLayout.render('default', {page: 'register'})
    }
});

FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('default', {page: 'notFound'})
    }
};