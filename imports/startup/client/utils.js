Template.registerHelper('equals', (value1, value2) => {
    return value1 == value2;
});

Template.registerHelper('arrayLength', (array) => {
    return array !== undefined ? array.length : 0;
});

Template.registerHelper('shortString', (userName) => {
    var maxLength = 12;
    if (userName.length > maxLength) {
        return userName.substr(0, 12);
    }
    return userName;
});

Template.registerHelper('timeSubtract', (start, end) => {
    start = moment(start);
    end = moment(end);
    return moment.utc(end.diff(start)).format("HH:mm:ss");
});

Template.registerHelper('toUpperCase', (string) => {
    return string.toUpperCase();
});

Template.registerHelper('formatDate', (date) => {
    return moment(date).format("DD/MM/YYYY hh:mm a");
});

Template.registerHelper('formatSingleDate', (date) => {
    return moment(date).format("Do MMM YY");
});

Template.registerHelper('formatTime', (date) => {
    return moment(date).format("h:mm a");
});

Template.registerHelper('paginationCol', (dataCount) => {
    numberArray = [];
    page = Math.ceil(dataCount / 20);
    for (i = 1; i <= page; i++)
        numberArray.push(i);
    return numberArray;
});

Template.registerHelper('downPage', () => {
    page = Number(FlowRouter.getParam('page'));
    if (page > 1) {
        return (page - 1);
    }
});

Template.registerHelper('upPage', (max, count) => {
    pageCount = Math.ceil(max / count);
    page = Number(FlowRouter.getParam('page'));
    if (page < pageCount) {
        return (page + 1);
    }
});

Template.registerHelper('pageActive', (page) => {
    return FlowRouter.getParam('page') == page;
});

Template.registerHelper('getCountDownTime', (time) => {
    day = parseInt(time / 86400);
    time %= 86400;
    hour = parseInt(time / 3600);
    time %= 3600;
    minutes = parseInt(time / 60);
    second = parseInt(time % 60);
    return {
        day: day,
        hour: hour,
        minutes: minutes,
        second: second
    }
});