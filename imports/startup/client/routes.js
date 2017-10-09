BlazeLayout.setRoot('body');

defaultRouter = FlowRouter.group({
    prefix: '',
    name: 'default.page',
    triggersEnter: [function (context, redirect) {
        if(Meteor.userId()) {
            // log
        }
    }]
});
defaultRouter.route('/', {
    name: 'dashboard.page',
    action: function () {
        BlazeLayout.render('default', {page: 'dashboard'})
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