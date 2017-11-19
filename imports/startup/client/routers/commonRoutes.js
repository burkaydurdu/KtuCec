commonRouter = FlowRouter.group({
    prefix: '',
    name: 'common.page',
    triggersEnter: [function (context, redirect) {
        Meteor.autorun(function () {
            if(!Meteor.userId()) {
               FlowRouter.go('/');
            }
        });
    }]
});

commonRouter.route('/activity/create', {
    name: 'activitCreate.page',
    action: function () {
        BlazeLayout.render("default", {page: 'activityCreate'});
    },
    subscriptions: function(){
        this.register('activity.create.pub', Meteor.subscribe('activity.create.pub'));
    }
});