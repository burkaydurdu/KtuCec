outRouter = FlowRouter.group({
    prefix: '',
    name: 'out.page',
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

outRouter.route('/login', {
    name: 'login.page',
    action: function () {
        BlazeLayout.render('default', {page: 'login'})
    }
});

outRouter.route('/register', {
    name: 'register.page',
    action: function () {
        BlazeLayout.render('default', {page: 'register'})
    }
});