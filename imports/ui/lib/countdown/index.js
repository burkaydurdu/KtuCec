import './index.html';
import './index.css';


Template.countdown.created = function() {
    this.time = new ReactiveVar(Number(Session.get('time')));
    this.meteorTimeId = new ReactiveVar("");
}

Template.countdown.helpers({
    time: () => {
        return Template.instance().time.get();
    }
});

Template.countdown.onRendered(function() {
    var self = this;
    counter = Meteor.setInterval(function() {
        self.time.set(self.time.get() - 1);
    }, 1000);
    self.meteorTimeId.set(counter);
});
Template.countdown.onDestroyed(function() {
    var self = this;
    Meteor.clearInterval(this.meteorTimeId.get());
});