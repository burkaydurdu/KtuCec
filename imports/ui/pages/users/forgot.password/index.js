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
            Accounts.forgotPassword(schoolNumber + "@ogr.ktu.edu.tr", (err) => {
                if (!err) {
                    return true;
                } else {
                    return false;
                }
            });
        } else {
            Materialize.toast("Okul numaranizi kontrol edin!", 2500, 'red white-text');
        }
    }
})