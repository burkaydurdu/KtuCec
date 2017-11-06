Template.registerHelper( 'paginationCol', (dataCount) => {
    numberArray = [];
    page = Math.ceil(dataCount / 10);
    for(i= 1; i <= page; i++)
        numberArray.push(i);
    return numberArray;
});

Template.registerHelper('arrayLength', (array) => {
    return array !== undefined ? array.length : 0;
});

Template.registerHelper('timeSubtract',(start, end) =>{
    start = moment(start);
    end = moment(end);
    return moment.utc(end.diff(start)).format("HH:mm:ss");
});

Template.registerHelper('toUpperCase', (string) => {
    return string.toUpperCase();
});

// Template.registerHelper('downPage', () =>{
//     page = Number(FlowRouter.getParam('page'));
//     if(page > 1){
//         return (page - 1);
//     }
// });
//
// Template.registerHelper('upPage', (max, count) =>{
//     pageCount = Math.ceil(max / count);
//     page = Number(FlowRouter.getParam('page'));
//     if(page < pageCount){
//         return (page + 1);
//     }
// });
//