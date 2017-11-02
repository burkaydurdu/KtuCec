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
            Accounts.sendVerificationEmail(user_id);
        } catch (e) {
            throw new Meteor.Error(100, "can not create");
        }
    },
    'profile.picture.add': function (pictureId) {
      try {
          Meteor.users.update(Meteor.userId(), {
              $addToSet: {
                  'profile.profilePictureId' : pictureId
              }
          });
      }  catch (e) {
          throw new Meteor.Error(101, "can not add");
      }
    },
    'role.create' : function (role) {
        Roles.addUsersToRoles(Meteor.users, [role]);
    }
});