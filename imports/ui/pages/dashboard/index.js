import './index.html'

Template.dashboard.helpers({
    firstActivity: () => {
        activity = activitys.findOne({
            $and: [{
                confirmation: true
            }, {
                date: {
                    $gt: new Date()
                }
            }]
        }, {
            sort: {
                date: 1
            }
        });
        if (activity != undefined) {
            var date1 = moment(new Date());
            var date2 = moment(activity.date);
            var dif = date2.diff(date1, 'second');
            Session.set('time', dif);
            return activity;
        } else {
            return activity;
        }
    },
    getFutureActivity: () => {
        activity = activitys.find({
            $and: [{
                confirmation: true
            }, {
                date: {
                    $gte: new Date()
                }
            }]
        });
        return activity === null ? false : activity.fetch();
    },
    getLastActivity: () => {
        activity = activitys.find({
            $and: [{
                confirmation: true
            }, {
                date: {
                    $lt: new Date()
                }
            }]
        });
        return activity === null ? false : activity.fetch();
    },
    getImage: (id) => {
        image = Images.find({
            _id: id
        });
        return image === null ? false : image;
    },
    getOwner: (id) => {
        user = Meteor.users.findOne({
            _id: id
        });
        return user === undefined ? false : user.profile.name + " " + user.profile.surname;
    },
    getDate: (date) => {
        return moment(date).format("Do MMM YY");
    },
    getTime: (date) => {
        return moment(date).format("h:mm a");
    },
    getArrayLength: (array) => {
        return array !== undefined ? array.length : 0;
    },
    isJoin: (id) => {
        number = activitys.find({
            $and: [{
                    _id: id
                },
                {
                    $or: [{
                        join: {
                            $in: [Meteor.userId()]
                        }
                    }, {
                        owner: Meteor.userId()
                    }]
                }
            ]
        }).count();
        return number !== 0;
    }
});

Template.dashboard.events({
    'click #activityJoin': (event) => {
        const id = event.currentTarget.dataset.id;
        Meteor.call('activity.join', id, (err) => {
            if (!err) {
                Materialize.toast('Basariyla Katildin', 2500, 'green white-text');
            } else {
                Materialize.toast('Hata Olustu', 2500, 'red white-text');
            }
        });
    }
});

Template.dashboard.onRendered(function() {
    this.autorun(() => {
        this.subscribe('dashboard.pub', () => {
            Tracker.afterFlush(() => {
                this.$('.materialboxed').materialbox();
            });
        })
    });
});