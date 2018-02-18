import '/imports/api/users/users'
import '/imports/api/activity/activity'
import '/imports/api/setting/setting'
import '/imports/api/alert/alert'

Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {
        path: "~/uploads"
    })]
});

Images.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    }
});