import './index.html'

Template.userSettingsProfile.helpers({
    user: () => {
        user = Meteor.user();
        return user != undefined ? user : false;
    }
});

Template.userSettingsProfile.events({
    'change #uploadImage': (event, template) => {
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function(err, fileObj) {
                if (!err) {
                    Meteor.call('profile.picture.add', fileObj._id, (err, res) => {
                        if (!err) {
                            Materialize.toast("Resim eklendi", 2500, "green darken-2 white-text");
                        } else {
                            Materialize.toast("Resim eklemede bir hata olustu!", 2500, "red darken-2 white-text");
                        }
                    });
                } else {
                    Materialize.toast("Resim eklemede bir hata olustu!", 2500, "red darken-2 white-text");
                }
            });
        });
    },
    'submit form#userSettingsProfileForm': (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const surname = event.target.surname.value;
        data = {
            name: name,
            surname: surname
        };
        Meteor.call('profile.update', data, (err, res) => {
            if (!err) {
                Materialize.toast('Profiliniz Guncellendi', 2500, 'green white-text');
            } else {
                Materialize.toast('Sorun Olustu', 2500, 'red white-text');
            }
        });
    }
});
Template.userSettingsProfile.onRendered(function() {
    this.autorun(() => {
        this.subscribe('user.setting.pub', () => {
            Tracker.afterFlush(() => {
                Materialize.updateTextFields();
            });
        })
    });
});