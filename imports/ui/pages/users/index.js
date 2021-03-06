import './index.html'

Template.users.helpers({
    dataCount: () => {
        usersList = Meteor.users.find({});
        return usersList != undefined ? usersList.count() : false;
    },
    data: () => {
        usersList = Meteor.users.find({}, {
            skip: (Number(FlowRouter.getParam('page')) - 1) * 20,
            limit: 20
        });
        return usersList != undefined ? usersList.fetch() : false;
    },
    role: () => {
        roleList = Meteor.roles.find({});
        return roleList != undefined ? roleList.fetch() : false;
    }
});

Template.users.events({
    'click #roleList>li>a': (event) => {
        const value = event.currentTarget.dataset.id;
        $('#addRole').val(value);
        Materialize.updateTextFields();
    },
    'click #appendRole': (event) => {
        const schoolNumber = $('#schoolNumber').val();
        const role = $('#addRole').val().toLowerCase();
        data = {
            schoolNumber: schoolNumber,
            role: role
        }
        if (data.schoolNumber != "" && data.role != "") {
            Meteor.call('user.append.role', data, (err, res) => {
                if (!err) {
                    Materialize.toast('Başarıyla atandı', 2500, 'green white-text');
                } else {
                    Materialize.toast('Sorun oluştu!', 2500, 'red white-text');
                }
            });
        } else {
            Materialize.toast('Gerekli yerleri doldurun!', 2500, 'red white-text');
        }
    },
    'click #removeRole': (event) => {
        const schoolNumber = $('#schoolNumber').val();
        const role = $('#addRole').val().toLowerCase();
        data = {
            schoolNumber: schoolNumber,
            role: role
        }
        if (data.schoolNumber != "" && data.role != "") {
            Meteor.call('user.remove.role', data, (err, res) => {
                if (!err) {
                    Materialize.toast('Basariyla Cikartildi', 2500, 'green white-text');
                } else {
                    Materialize.toast('Sorun olustu!', 2500, 'red white-text');
                }
            });
        } else {
            Materialize.toast('Gerekli yerleri doldurun!', 2500, 'red white-text');
        }
    },
    'click table a.user-options': function(event) {
        const id = event.currentTarget.dataset.id;
        Meteor.call('user.remove', id, (err, res) => {
            if (!err) {
                Materialize.toast('Basariyla silindi', 2500, 'green white-text');
            } else {
                Materialize.toast('Sorun olustu!', 2500, 'red white-text');
            }
        });
    }
});

Template.users.onRendered(function() {
    this.autorun(() => {
        this.subscribe('users.list.pub', () => {
            Tracker.afterFlush(() => {
                this.$('input#schoolNumber').characterCounter();
                this.$('select').material_select();
                this.$('.dropdown-button').dropdown({
                    constrainWidth: false,
                    alignment: 'right'
                });
            });
        })
    });
});