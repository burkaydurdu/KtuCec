BlazeLayout.setRoot('body');

defaultRouter = FlowRouter.group({
    prefix: '',
    name: 'default.page',
    triggersEnter: [function (context, redirect) {

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

FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('default', {page: 'notFound'})
    }
};