import './index.html'


Template.activityEdit.helpers({
    data: () => {
        data = activitys.findOne({
            _id: FlowRouter.getParam('id')
        });
        return data != undefined ? data : false;
    },
    uploadImage: (id) => {
        image = Images.find({
            _id: id
        });
        return image === null ? false : image;
    }
});

Template.activityEdit.events({
    'change #uploadImage': (event, template) => {
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function(err, fileObj) {
                if (!err) {
                    data = {
                        id: FlowRouter.getParam('id'),
                        imageId: fileObj._id
                    };
                    Meteor.call('activity.image.update', data, (err, res) => {
                        if (!err) {
                            Materialize.toast("Resim Guncellendi", 2500, "green darken-2 white-text");
                        } else {
                            Materialize.toast("Resim guncellemede bir hata olustu!", 2500, "red darken-2 white-text");
                        }
                    })
                }
            });
        });
    },
    'submit form#activityEditForm': (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const place = event.target.place.value;
        const description = event.target.description.value;
        // date = moment(new Date(event.target.date.value));
        // time = moment(event.target.time.value, ["hh:mm a"]);
        // date.set('hour', time.get('hour'));
        // date.set('minute', time.get('minute'));

        activityObject = {
            id: FlowRouter.getParam('id'),
            name: name,
            //date: moment(date).toDate(),
            place: place,
            description: description
        };
        Meteor.call('activity.content.update', activityObject, (err, res) => {
            if (!err) {
                Materialize.toast("Etkinlik icerigi guncellendi", 2500, "green darken-2 white-text");
            } else {
                Materialize.toast("Etkinlik icerigi guncellenemedi!", 2500, "red darken-2 white-text");
            }
        });
    }
});

Template.activityEdit.onRendered(function() {
    this.autorun(() => {
        this.subscribe('activity.edit.pub', () => {
            Tracker.afterFlush(() => {
                Materialize.updateTextFields();
                // this.$('.datepicker').pickadate({
                //     selectMonths: true,
                //     selectYears: 17,
                //     today: 'Today',
                //     clear: 'Clear',
                //     close: 'Ok',
                //     closeOnSelect: true,
                //     onSet: function(arg) {
                //         if ('select' in arg) {
                //             this.watchDate.set($('.datepicker').val());
                //         }
                //     }
                // });
                // this.$('.timepicker').pickatime({
                //     default: 'now',
                //     fromnow: 0,
                //     twelvehour: false,
                //     donetext: 'OK',
                //     cleartext: 'Clear',
                //     canceltext: 'Cancel',
                //     autoclose: true,
                //     ampmclickable: true,
                //     afterDone: function() {
                //         this.watchTime.set($('.timepicker').val());
                //     }
                // });
            });
        });
    });
});