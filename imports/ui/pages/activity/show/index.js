import './index.html'

Template.activityShow.helpers({
    dataName: () => {
        if (Session.equals('showActivitData', "created")) {
            return "Olusturulan Etkinlikler";
        } else if (Session.equals('showActivitData', "joined")) {
            return "Katilinan etkinlikler";
        }
    },
    dataCount: () => {
        if (Session.equals('showActivitData', "created")) {
            var dataCount = activitys.find({
                owner: Meteor.userId()
            }).count();
        } else if (Session.equals('showActivitData', "joined")) {
            var dataCount = activitys.find({
                join: {
                    $in: [Meteor.userId()]
                }
            }).count();
        }
        return dataCount;
    },
    data: () => {
        if (Session.equals('showActivitData', "created")) {
            data = activitys.find({
                owner: Meteor.userId()
            }, {
                skip: (Number(FlowRouter.getParam('page')) - 1) * 20,
                limit: 20
            });
        } else if (Session.equals('showActivitData', "joined")) {
            data = activitys.find({
                join: {
                    $in: [Meteor.userId()]
                }
            }, {
                skip: (Number(FlowRouter.getParam('page')) - 1) * 20,
                limit: 20
            });
        }
        return data;
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
    getUser: () => {
        return Meteor.userId();
    }
});

Template.activityShow.events({
    'click .card-action a': (event) => {
        const selector = event.currentTarget.innerText;
        if (selector == 'SIL') {
            const id = event.currentTarget.dataset.id;
            Meteor.call('activity.remove', id, (err, res) => {
                if (!err) {
                    Materialize.toast('Etkinlik Silindi', 2500, 'green white-text');
                } else {
                    Materialize.toast('Etkinlik Silinemedi!', 2500, 'red white-text');
                }
            });
        }
    }
});

Template.activityShow.onRendered(function() {
    this.autorun(() => {
        this.subscribe('user.activity.pub', () => {
            Tracker.afterFlush(() => {
                this.$('.materialboxed').materialbox();
            });
        })
    });
});