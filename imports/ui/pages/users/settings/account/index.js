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
                    Materialize.toast('Sifreniz Degistirildi', 3500, 'green white-text');
                } else {
                    if (err.reason == "Incorrect password") {
                        Materialize.toast('Sifreniz dogru degil', 3500, 'red white-text');
                    }
                }
            });
        } else {
            Materialize.toast('Yeni sifrenizi kontrol edin!', 3500, 'red white-text');
        }
    }
});