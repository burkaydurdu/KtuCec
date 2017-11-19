import './index.html'


Template.activity.onCreated( () => {
});

Template.activity.helpers({
    getConfirmActivity: () => {
        activity = activitys.find({
            $and: [
                {
                    confirmation: true
                }, {
                    date: {
                        $gte: new Date()
                    }
                }
            ]
        }, {sort: {date: -1} });
        return activity.count() === 0 ? false :
            {
                dataList: activity.fetch(),
                dataCount: activity.count()
            };
    },
    getNotConfirmActivity: () => {
        activity = activitys.find({
            $and: [
                {
                    confirmation: false
                }, {
                    date: {
                        $gte: new Date()
                    }
                }
            ]
        }, {sort: {date: -1} });
        return activity.count() === 0 ? false :
            {
                dataList: activity.fetch(),
                dataCount: activity.count()
            };
    },
    getLastActivity: () => {
        activity = activitys.find({
            date: {
                $lt: new Date()
            }
        }, {sort: {date: -1} });
        return activity.count() === 0 ? false :
            {
                dataList: activity.fetch(),
                dataCount: activity.count()
            };
    },
    getImage: (id) => {
        image = Images.find({_id: id});
        return image === null ? false : image;
    },
    getOwner: (id) => {
        user = Meteor.users.findOne({_id: id});
        return user === null ? false : user.profile.name + " " + user.profile.surname;
    },
    getDate: (date) => {
        return moment(date).format("Do MMM YY");
    },
    getTime: (date) => {
        return moment(date).format("h:mm a");
    }
});

Template.activity.events({
    'click .card-action a': (event) => {
        const id = event.currentTarget.dataset.id;
        Meteor.call('activity.confirm', id, function (err, res) {
            if(!err) {
                Materialize.toast('Etkinlik onaylandi', 2500, 'green white-text');
            } else {
                Materialize.toast('Hata olustu', 2500, 'red white-text');
            }
        });
    }
});

Template.activity.onRendered( function () {
    this.autorun( () => {
        this.subscribe('admin.activity.pub', () => {
            Tracker.afterFlush( () => {
                this.$('.materialboxed').materialbox();
            });
        })
    });
});