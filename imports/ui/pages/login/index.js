import './index.html'
import './index.css'

Template.login.events({
  'submit form#loginForm': function(event) {
    event.preventDefault();
    email_username = event.target.email_username.value;
    password = event.target.password.value;

    Meteor.call('user.verified.email', email_username, (err, res) => {
      if (!err) {
        if (res.user === false) {
          Materialize.toast('Kullanici bulunamadi, bilgilerinizi kontrol edin!', 2500, 'red darken-2 white=text');
        } else {
          if (res.verified === false) {
            Materialize.toast("Lutfen, eposta'niza gelen onaylama mesajini kontrol edin!", 2500, 'red darken-2 white=text');
          } else {
            Meteor.loginWithPassword(email_username, password, function(err, res) {
              if (!err) {
                Materialize.toast('Hos Geldin ' + Meteor.user().profile.name, 2500, 'green darken-2 white=text');
                if (Roles.userIsInRole(Meteor.userId(), ['user'])) {
                  FlowRouter.go('/user/dashboard');
                } else {
                  FlowRouter.go('/admin/dashboard');
                }
              }
            });
          }
        }
      }
    });
  }
});
