Meteor.methods({
    'user.create' : function (data) {
        try {
            user_id = Accounts.createUser({
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
    'user.verified.email': function (email_or_name) {
        try {
            user = Accounts.findUserByEmail(email_or_name);
            user = user !== undefined ? user : Accounts.findUserByUsername(email_or_name);
            if (user !== undefined) {
                return {
                    user: true,
                    verified: user.emails[0].verified
                }
            } else {
                return {
                    user: false,
                    verified: false
                }
            }
        } catch (e) {
            throw new Meteor.Error(100, 'Error');
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