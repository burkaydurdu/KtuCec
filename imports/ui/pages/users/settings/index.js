import './index.html'

Template.userSetting.onCreated(function() {
    this.menu = new ReactiveVar('profile');
});

Template.userSetting.helpers({
    menu: () => {
        return Template.instance().menu.get();
    }
});

Template.userSetting.events({
    'click #menuProfile': (event, template) => {
        template.menu.set('profile');
    },
    'click #menuAccount': (event, template) => {
        template.menu.set('account');
    }
})