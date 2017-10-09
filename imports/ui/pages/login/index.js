import './index.html'
import './index.css'

Template.login.events({
   'submit form#loginForm': function (event) {
       event.preventDefault();
       email_username = event.target.email_username.value;
       password = event.target.password.value;
       Meteor.loginWithPassword(email_username, password, function (err, res) {
           if(!err) {
               FlowRouter.go('/')
           } else {
               //error
           }
       });
   }
});

Template.login.rendered = function () {
  $('body').css('background-image', 'url(image/bg.jpg)');
};