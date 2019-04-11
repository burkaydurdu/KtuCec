import './index.html'

Template.activity.created = function() {
    this.category = new ReactiveVar('all');
}

Template.activity.helpers({
    dataName: () => {
        category = Template.instance().category.get();
        if (category == "confirm") {
            return "Gelecek/Onaylanmış Etkinlikler";
        } else if (category == "notConfirm") {
            return "Onaylanmamış Etkinlikler";
        } else if (category == "last") {
            return "Geçmiş Etkinlikler";
        } else {
            return "Tümü"
        }
    },
    data: () => {
        category = Template.instance().category.get();
        if (category == "confirm") {
            var activity = activitys.find({
                $and: [{
                    confirmation: true
                }, {
                    date: {
                        $gte: new Date()
                    }
                }]
            }, {
                sort: {
                    date: -1
                },
                skip: (Number(FlowRouter.getParam('page')) - 1) * 20,
                limit: 20
            });
        } else if (category == "notConfirm") {
            var activity = activitys.find({
                $and: [{
                    confirmation: false
                }, {
                    date: {
                        $gte: new Date()
                    }
                }]
            }, {
                sort: {
                    date: -1
                },
                skip: (Number(FlowRouter.getParam('page')) - 1) * 20,
                limit: 20
            });
        } else if (category == "last") {
            var activity = activitys.find({
                date: {
                    $lt: new Date()
                }
            }, {
                sort: {
                    date: -1
                },
                skip: (Number(FlowRouter.getParam('page')) - 1) * 20,
                limit: 20
            });
        } else {
            var activity = activitys.find({}, {
                skip: (Number(FlowRouter.getParam('page')) - 1) * 20,
                limit: 20
            });
        }
        return activity.count() === 0 ? false : {
            dataList: activity.fetch(),
            dataCount: activity.count()
        };
    },
    getImage: (id) => {
        image = Images.find({
            _id: id
        });
        return image === undefined ? false : image;
    },
    getOwner: (id) => {
        user = Meteor.users.findOne({
            _id: id
        });
        return user === undefined ? false : user.profile.name + " " + user.profile.surname;
    }
});

Template.activity.events({
    'click .card-action a.conf': (event) => {
        const id = event.currentTarget.dataset.id;
        Meteor.call('activity.confirm', id, function(err, res) {
            if (!err) {
                Materialize.toast('Etkinlik onaylandı', 2500, 'green white-text');
            } else {
                Materialize.toast('Hata oluştu', 2500, 'red white-text');
            }
        });
    },
    'click .card-action a.del': (event) => {
        const id = event.currentTarget.dataset.id;
        Meteor.call('activity.remove.admin', id, function(err, res) {
            if (!err) {
                Materialize.toast('Etkinlik Silindi', 2500, 'green white-text');
            } else {
                Materialize.toast('Hata oluştu', 2500, 'red white-text');
            }
        });
    },
    'click #categoryActivity a': (event, template) => {
        const id = event.currentTarget.dataset.id;
        if (id == "confirm") {
            template.category.set('confirm');
        } else if (id == "notConfirm") {
            template.category.set('notConfirm');
        } else if (id == "last") {
            template.category.set('last');
        } else {
            template.category.set('all');
        }
    }
});

Template.activity.onRendered(function() {
    this.autorun(() => {
        this.subscribe('admin.activity.pub', () => {
            Tracker.afterFlush(() => {
                this.$('.materialboxed').materialbox();
                this.$('.dropdown-button').dropdown({
                    constrainWidth: false,
                    belowOrigin: true
                });
            });
        });
    });
});