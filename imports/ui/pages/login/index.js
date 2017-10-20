import './index.html'
import './index.css'

Template.login.events({
   'submit form#loginForm': function (event) {
       event.preventDefault();
       email_username = event.target.email_username.value;
       password = event.target.password.value;
       Meteor.loginWithPassword(email_username, password, function (err, res) {
           if(!err) {
               Materialize.toast('Wellcome ' + Meteor.user().profile.name, 2500, 'green darken-2 white=text');
               if(Roles.userIsInRole(Meteor.userId(),['user'])) {
                   FlowRouter.go('/user/dashboard');
               } else {
                   FlowRouter.go('/admin/dashboard');
               }
           } else {
               Materialize.toast('Check username or password', 2500, 'red darken-2 white=text');
           }
       });
   }
});