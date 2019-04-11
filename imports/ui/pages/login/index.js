import './index.html'

Template.login.events({
    'submit form#loginForm': function(event) {
        event.preventDefault();
        email_username = event.target.email_username.value;
        password = event.target.password.value;

        Meteor.call('user.verified', email_username, (err, res) => {
            if (!err) {
                if (res.user == false) {
                    Materialize.toast('Kullanıcı bulunamadı, bilgilerinizi kontrol edin!', 2500, 'red darken-2 white=text');
                } else {
                    if (res.verified == false) {
                        Materialize.toast("Lütfen, {okul numrası}@ogr.ktu.edu.tr eposta'nıza gelen onaylama mesajını kontrol edin!", 2500, 'red darken-2 white=text');
                    } else {
                        Meteor.loginWithPassword(email_username, password, function(err, res) {
                            if (!err) {
                                Materialize.toast('Hoş Geldin ' + Meteor.user().profile.name, 2500, 'green darken-2 white=text');
                                if (Roles.userIsInRole(Meteor.userId(), ['user'])) {
                                    FlowRouter.go('/user/dashboard');
                                } else {
                                    FlowRouter.go('/admin/dashboard');
                                }
                            } else {
                                Materialize.toast('Şifreniz doğru değil lutfen tekrar deneyin!', 2500, 'red darken-2 white=text');
                            }
                        });
                    }
                }
            }
        });
    }
});