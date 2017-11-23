import './index.html'

Template.activityCreate.onCreated(function() {
    this.currentUpload = new ReactiveVar(false);
    this.uploadImageId = new ReactiveVar(false);
    this.watchName = new ReactiveVar("");
    this.watchPlace = new ReactiveVar("");
    this.watchDescription = new ReactiveVar("");
});

Template.activityCreate.helpers({
    currentUpload() {
        return Template.instance().currentUpload.get();
    },
    uploadImage() {
        return Template.instance().uploadImageId.get();
    },
    watchName() {
        return Template.instance().watchName.get();
    },
    watchPlace() {
        return Template.instance().watchPlace.get();
    },
    watchDescription() {
        return Template.instance().watchDescription.get();
    },
    watchTime() {
        return Session.get('watchTime');
    },
    watchDate() {
        return Session.get('watchDate');
    }
});

Template.activityCreate.events({
    'change #uploadImage': (event, template) => {
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function(err, fileObj) {
                if (!err) {
                    template.uploadImageId.set(fileObj._id);
                    Materialize.toast("Resim eklendi", 2500, "green darken-2 white-text");
                } else {
                    Materialize.toast("Resim eklemede bir hata olustu!", 2500, "red darken-2 white-text");
                }
            });
        });
    },
    'keyup #name': (event, template) => {
        template.watchName.set(event.currentTarget.value);
    },
    'keyup #place': (event, template) => {
        template.watchPlace.set(event.currentTarget.value);
    },
    'keyup #description': (event, template) => {
        template.watchDescription.set(event.currentTarget.value);
    },
    'submit form#activityCreateForm': (event, template) => {
        event.preventDefault();

        const imageId = template.uploadImageId.get();
        const name = event.target.name.value;
        const place = event.target.place.value;
        const description = event.target.description.value;
        date = moment(new Date(event.target.date.value));
        time = moment(event.target.time.value, ["hh:mm a"]);
        date.set('hour', time.get('hour'));
        date.set('minute', time.get('minute'));

        activityObject = {
            createdAt: moment().toDate(),
            imageId: imageId,
            name: name,
            date: moment(date).toDate(),
            place: place,
            description: description
        };

        if (activityObject.name != null && activityObject.place != null && activityObject.description != null && activityObject.imageId && activityObject.date != null) {
            Meteor.call('activity.create', activityObject, (err, res) => {
                if (!err) {
                    Materialize.toast("Etkinlik olusturuldu", 2500, "green darken-2 white-text");

                } else {
                    Materialize.toast("Etkinlik olusturulamadi!", 2500, "red darken-2 white-text");
                }
            });
        } else {
            Materialize.toast("Gerekli alanlari doldurun", 2500, "red darken-2 white-text");
        }
    }
});

Template.activityCreate.rendered = function() {
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 17,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: true,
        onSet: function(arg) {
            if ('select' in arg) {
                Session.set('watchDate', $('.datepicker').val());
            }
        }
    });
    $('.timepicker').pickatime({
        default: 'now',
        fromnow: 0,
        twelvehour: false,
        donetext: 'OK',
        cleartext: 'Clear',
        canceltext: 'Cancel',
        autoclose: true,
        ampmclickable: true,
        afterDone: function() {
            Session.set('watchTime', $('.timepicker').val())
        }
    });
};

Template.activityCreate.destroyed = function() {
    Session.delete('watchDate');
    Session.delete('watchTime');
};