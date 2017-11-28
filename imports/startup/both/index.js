import '/imports/api/users/users.js'
import '/imports/api/activity/activity'
import '/imports/api/setting/setting'

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