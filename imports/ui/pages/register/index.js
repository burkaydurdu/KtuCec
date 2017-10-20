import './index.html'
import './index.css'

Template.register.events({
   'submit form#registerForm' : function (event) {
       event.preventDefault();
       data = {
           username : event.target.username.value,
           name : event.target.name.value,
           surname : event.target.surname.value,
           password : event.target.password.value,
           passwordConfirm : event.target.password_confirm.value,
           schoolNumber : event.target.school_no.value,
           startYear : event.target.start_year.value,
           email : event.target.email.value,
       };
       if(data.password == data.passwordConfirm) {
            Meteor.call('user.create', data, function (err, res) {
                if(!err) {
                    FlowRouter.go('/login');
                } else {
                    //user is not found
                }
            })
       } else {
           //password is not correct
       }

   }
});