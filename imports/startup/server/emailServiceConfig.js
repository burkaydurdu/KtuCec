smtp = {
    username : 'ktucectrabzon@gmail.com',
    password : 'ktucec61',
    server : 'smtp.gmail.com',
    port : 587
};
process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' +
    encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

Accounts.emailTemplates.siteName = 'KtuCec';
Accounts.emailTemplates.from = 'KtuCec Admin boot';
Accounts.emailTemplates.verifyEmail = {
    subject(user) {
        return `Welcome to KtuCec Group, ${user.profile.name} ${user.profile.surname}`;
    },
    text(user, url) {
        return `Hey ${user.username}! Verify your e-mail by following this link: ${url}`;
    }
};
