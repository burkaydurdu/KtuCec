import './index.html'
import './index.css'

Template.register.events({
    'submit form#registerForm': function(event) {
        event.preventDefault();
        data = {
            username: event.target.username.value,
            name: event.target.name.value,
            surname: event.target.surname.value,
            password: event.target.password.value,
            passwordConfirm: event.target.passwordConfirm.value,
            schoolNumber: event.target.schoolNumber.value,
            startYear: event.target.startYear.value,
        };
        if (data.schoolNumber.length === 6 && data.schoolNumber > 0) {
            if (data.password === data.passwordConfirm) {
                Meteor.call('user.create', data, function(err, res) {
                    if (!err) {
                        Materialize.toast("Kayit islemi basarili. Lutfen mail adresine gelen mesaji onaylayin. Daha sonra giris yapabilirsiniz.", 3500, "green white-text");
                        FlowRouter.go('/login');
                    } else {
                        Materialize.toast(err.reason, 2500, "red white-text");
                    }
                })
            } else {
                Materialize.toast("Sifrenizi kontrol edin!!", 2500, "red white-text");
            }
        } else {
            Materialize.toast('Okul numaranizi kontrol edin!', 2500, "red white-text");
        }
    }
});