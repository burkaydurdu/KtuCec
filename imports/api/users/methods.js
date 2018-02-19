Meteor.methods({
    'user.create': function(data) {
        try {
            user_id = Accounts.createUser({
                username: data.username,
                email: data.schoolNumber + "@ogr.ktu.edu.tr",
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
            throw new Meteor.Error(e.error, e.reason);
        }
    },
    'user.append.role': function(data) {
        try {
            const userId = Meteor.users.findOne({
                'profile.schoolNumber': data.schoolNumber
            })._id;
            Roles.addUsersToRoles(userId, data.role);
        } catch (e) {
            throw new Meteor.Error(e.error, e.reason);
        }
    },
    'user.remove.role': function(data) {
        try {
            const userId = Meteor.users.findOne({
                'profile.schoolNumber': data.schoolNumber
            })._id;
            Roles.removeUsersFromRoles(userId, data.role);
        } catch (e) {
            throw new Meteor.Error(e.error, e.reason);
        }
    },
    'user.verified': function(email_or_name) {
        try {
            user = Accounts.findUserByEmail(email_or_name);
            user = user != undefined ? user : Accounts.findUserByUsername(email_or_name);
            return user != undefined ? {
                user: true,
                verified: user.emails[0].verified
            } : {
                user: false
            }
        } catch (e) {
            throw new Meteor.Error(100, 'Error');
        }
    },
    'profile.picture.add': function(pictureId) {
        try {
            imageId = Meteor.users.findOne({
                _id: Meteor.userId()
            }).profile.profilePictureId;

            if (imageId != undefined) {
                Images.remove({
                    _id: imageId
                });
            }

            Meteor.users.update(Meteor.userId(), {
                $set: {
                    'profile.profilePictureId': pictureId
                }
            });
        } catch (e) {
            throw new Meteor.Error(101, "can not add");
        }
    },
    'profile.update': function(data) {
        try {
            Meteor.users.update(Meteor.userId(), {
                $set: {
                    'profile.name': data.name,
                    'profile.surname': data.surname
                }
            }, {
                multi: true
            });
        } catch (e) {
            throw new Meteor.Error(e.error, e.reason);
        }
    },
    'forgot.password': function(schoolNumber) {
        Accounts.forgotPassword(schoolNumber + "@ogr.ktu.edu.tr", (err) => {
            if (!err) {
                return true;
            } else {
                return false;
            }
        });
    }
});