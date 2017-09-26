BlazeLayout.setRoot('body');

defaultRouter = FlowRouter.group({
    prefix: '/',
    name: 'default.page',
    triggersEnter: [function (context, redirect) {

    }]
});

defaultRouter.route('/', {
    name: 'login.page',
    action: function () {
        if(!Meteor.user()) {
            BlazeLayout.render('default', {page: 'login'})
        }
    }
});


FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('default', {page: 'notFound'})
    }
};