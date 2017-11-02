import './index.html'
import './index.css'

Template.dashboard.helpers({
    getActivitys: () => {
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
        });
        return activity === null ? false : activity.fetch();
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
    },
    getArrayLength: (array) => {
        return array !== undefined ? array.length : 0;
    },
    isJoin: (id) => {
        number = activitys.find({
            $and: [
                { _id: id },
                {
                    join: {
                        $in : [Meteor.userId()]
                    }
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
          if(!err) {
              Materialize.toast('Join success', 2500, 'green white-text');
          } else {
              Materialize.toast('Error', 2500, 'red white-text');
          }
       });
   }
});

Template.dashboard.onRendered( function () {
    this.autorun( () => {
        this.subscribe('dashboard.pub', () => {
            Tracker.afterFlush( () => {
                this.$('.materialboxed').materialbox();
            });
        })
    });
});