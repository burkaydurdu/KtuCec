Meteor.methods({
    'user.create' : function (data) {
        try {
            Accounts.createUser({
                username: data.username,
                email: data.email,
                password: data.password,
                profile: {
                    name: data.name,
                    surname: data.surname,
                    schoolNumber: data.schoolNumber,
                    startYear: data.startYear
                }
            });
        } catch (e) {
            throw new Meteor.Error(100, "can not create");
        }
    },

    'role.create' : function () {
        Roles.addUsersToRoles(Meteor.users, ['user']);
    }
});