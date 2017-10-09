import './index.html'
import './index.css'

Template.dashboard.rendered = function () {
    $('body').css('background-image', 'url(image/bg2.jpg)');
};