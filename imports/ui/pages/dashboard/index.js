import './index.html'
import './index.css'

Template.dashboard.helpers({
    getActivitys: () => {
        activity = activitys.find({confirmation: true});
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
    }
});

Template.dashboard.onRendered( function () {
    Tracker.autorun(() => {
        $('.materialboxed').materialbox();
    });
});