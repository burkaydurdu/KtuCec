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
            passwordConfirm : event.target.passwordConfirm.value,
            schoolNumber : event.target.schoolNumber.value,
            startYear : event.target.startYear.value,
            email : event.target.email.value,
        };

        emailArray = data.email.split('@');
        if (emailArray[1] === 'ogr.ktu.edu.tr') {
            if (data.password === data.passwordConfirm) {
                Meteor.call('user.create', data, function (err, res) {
                    if (!err) {
                        Materialize.toast("Kayit islemi basarili. Lutfen mail adresine gelen mesaji onaylayin. Daha sonra giris yapabilirsiniz.", 2500, "green white-text");
                        FlowRouter.go('/login');
                    } else {
                        // TODO buraya mail username hatalari yada diger hatalari belirleyip mesaj cikarilicaktir.
                    }
                })
            } else {
                Materialize.toast("Check Password", 2500, "red white-text");
            }
        } else {
            Materialize.toast("Please, enter the school email adress", 2500, "red white-text");
        }
    }
});