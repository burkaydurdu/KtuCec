import './index.html'

Template.userSettingsAccount.events({
    'submit form#userSettingsAccountForm': (event) => {
        event.preventDefault();
        const oldPassword = event.target.old_password.value;
        const newPassword = event.target.new_password.value;
        const newPasswordCof = event.target.new_password_conf.value;

        if (newPassword == newPasswordCof) {
            Accounts.changePassword(oldPassword, newPassword, (err) => {
                if (!err) {
                    Materialize.toast('Şifreniz Değiştirildi', 3500, 'green white-text');
                } else {
                    if (err.reason == "Incorrect password") {
                        Materialize.toast('Şifreniz doğru değil', 3500, 'red white-text');
                    }
                }
            });
        } else {
            Materialize.toast('Yeni şifrenizi kontrol edin!', 3500, 'red white-text');
        }
    }
});