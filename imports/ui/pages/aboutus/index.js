import './index.html'

Template.aboutUs.helpers({
    about: () => {
        setting = settings.findOne({
            type: 'aboutus'
        });
        return setting != undefined ? setting.content.about : false;
    }
})