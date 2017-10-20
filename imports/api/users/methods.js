Meteor.methods({
    'user.create' : function (data) {
        try {
          var user_id =
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
            Roles.addUsersToRoles(user_id, ['user']);
        } catch (e) {
            throw new Meteor.Error(100, "can not create");
        }
    },

    'role.create' : function (role) {
        Roles.addUsersToRoles(Meteor.users, [role]);
    }
});