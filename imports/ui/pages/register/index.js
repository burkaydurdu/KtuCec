import './index.html'

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
            if (data.startYear > 1992 && data.startYear <= Number(moment().format("YYYY"))) {
                if (data.password === data.passwordConfirm) {
                    Meteor.call('user.create', data, function(err, res) {
                        if (!err) {
                            Materialize.toast(`Kayıt işlemi başarılı. ${data.schoolNumber}@ogr.ktu.edu.tr mail adresine gelen mesaji onaylayın. Daha sonra giriş yapabilirsiniz.`, 4000, "green white-text");
                            FlowRouter.go('/login');
                        } else {
                            Materialize.toast(err.reason, 2500, "red white-text");
                        }
                    })
                } else {
                    Materialize.toast("Şifrenizi kontrol edin!!", 2500, "red white-text");
                }
            } else {
                Materialize.toast('Okula giriş yılınızı kontrol edin!', 2500, "red white-text");
            }
        } else {
            Materialize.toast('Okul numaranızı kontrol edin!', 2500, "red white-text");
        }
    }
});