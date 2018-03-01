import './index.html';

Template.managers.helpers({
    managersData: () => {
        users = Meteor.users.find({
            roles: {
                $in: ['manager']
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