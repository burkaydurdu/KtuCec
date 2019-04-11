import '/imports/api/users/users'
import '/imports/api/activity/activity'
import '/imports/api/setting/setting'
import '/imports/api/alert/alert'

Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {
        path: "~/uploads"
    })],
    filter: {
        allow: {
            contentTypes: ['image/*'],
            extensions: ['png', 'jpg', 'jpeg']
        },
        onInvalid: function(message) {
            if (Meteor.isClient) {
                Materialize.toast('Lütfen Doğru bir seçim yapın', 2500, 'red darken-2 white=text');
            } else {

            }
        }
    }
});

Images.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    }
});