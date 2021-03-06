import './index.html'

Template.forgotPassword.events({
    'submit form#forgotPasswordForm': (event) => {
        event.preventDefault();
        var schoolNumber = event.target.schoolNumber.value;
        if (schoolNumber.length === 6 && schoolNumber > 0) {
            // Meteor.call('forgot.password', schoolNumber, function(error, result) {
            //     if (error) {
            //         Materialize.toast("Hata olustu tekrar deneyin", 2500, 'red white-text');
            //     } else {
            //         Materialize.toast("Gonderildi, email'linizi kontrol edin", 2500, 'green white-text');
            //     }
            // });
            Accounts.forgotPassword({
                email: schoolNumber + "@ogr.ktu.edu.tr"
            }, (err) => {
                if (err) {
                    Materialize.toast("Hata oluştu tekrar deneyin", 2500, 'red white-text');
                } else {
                    Materialize.toast("Gönderildi, email'inizi kontrol edin", 2500, 'green white-text');
                }
            });
        } else {
            Materialize.toast("Okul numaranızı kontrol edin!", 2500, 'red white-text');
        }
    }
})