import './index.html'

Template.members.helpers({
    isReady: () => {
        return FlowRouter.subsReady('members.pub');
    },
    dataCount: () => {
        users = Meteor.users.find({
            roles: {
                $nin: ['manager', 'admin']
            }
        });
        return users != undefined ? users.count() : false;
    },
    membersData: () => {
        users = Meteor.users.find({
            roles: {
                $nin: ['manager', 'admin']
            }
        }, {
            skip: (Number(FlowRouter.getParam('page')) - 1) * 20,
            limit: 20
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