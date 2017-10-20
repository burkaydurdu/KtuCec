import './index.html'

Template.activityCreate.onCreated(function () {
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
    uploadImage(){
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
    }
});

Template.activityCreate.events({
    'change #uploadImage' : (event, template) => {
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function (err, fileObj) {
                if(!err){
                    template.uploadImageId.set(fileObj._id);
                    Materialize.toast("Successful",2500,"green darken-2 white-text");
                } else{
                    Materialize.toast("Error",2500,"red darken-2 white-text");
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
    }
});

Template.activityCreate.rendered = function () {
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 17, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
    });
    $('.timepicker').pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function(){} //Function for after opening timepicker
    });
};