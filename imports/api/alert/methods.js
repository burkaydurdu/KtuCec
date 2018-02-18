Meteor.methods({
    'alert.create': (data) => {
        try {
            alerts.insert({
                createdAt: data.createdAt,
                content: data.content,
                owner: data.owner
            });
        } catch (e) {
            throw new Meteor.Error(300, "cant create document");
        }
    },
    'alert.remove': (id) => {
        try {
            alerts.remove({
                _id: id,
                owner: Meteor.userId()
            });
        } catch (e) {
            throw new Meteor.Error(300, "cant remove document");
        }
    }
});