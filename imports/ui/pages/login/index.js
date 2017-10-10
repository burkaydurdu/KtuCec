import './index.html'
import './index.css'

Template.login.events({
   'submit form#loginForm': function (event) {
       event.preventDefault();
       email_username = event.target.email_username.value;
       password = event.target.password.value;
       Meteor.loginWithPassword(email_username, password, function (err, res) {
           if(!err) {
               if(Roles.userIsInRole(Meteor.userId(),['user'])) {
                   FlowRouter.go('/user/dashboard');
               } else {
                   FlowRouter.go('/admin/dashboard');
               }
           } else {
               //error
           }
       });
   }
});