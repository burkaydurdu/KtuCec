import './index.html'

Template.members.helpers({
    membersData: () => {
        users = Meteor.users.find({
            roles: {
                $in: ['user']
            }
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