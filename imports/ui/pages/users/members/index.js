import './index.html'

Template.members.helpers({
    membersData: () => {
        users = Meteor.users.find({}, {
            $and: [{
                roles: {
                    $in: ['user']
                }
            }, {
                roles: {
                    $nin: ['user']
                }

            }]
        });
        return users != undefined ? users : false;
    },
    getImage: (id) => {
        image = Images.find({
            _id: id
        });
        return image === null ? false : image;
    }
});