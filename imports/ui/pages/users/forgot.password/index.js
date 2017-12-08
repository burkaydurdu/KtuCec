import './index.html'

Template.forgotPassword.events({
    'submit form#forgotPasswordForm': (event) => {
        event.preventDefault();
        var schoolNumber = event.target.schoolNumber.value;
        var captchaData = grecaptcha.getResponse();
        if (schoolNumber.length === 6 && schoolNumber > 0) {
            Meteor.call('google.captcha.forgot', schoolNumber, captchaData, function(error, result) {
                grecaptcha.reset();
                if (error) {
                    console.log('There was an error: ' + error.reason);
                } else {
                    Materialize.toast("Gonderildi, email'linizi kontrol edin", 2500, 'green white-text');
                }
            });
        } else {
            Materialize.toast("Okul numaranizi kontrol edin!", 2500, 'red white-text');
        }
    }
})