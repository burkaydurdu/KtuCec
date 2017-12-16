settings = new Mongo.Collection('settings');
settingsSchema = new SimpleSchema({
    type: {
        type: String
    },
    content: {
        type: Object,
        blackbox: true
    }
})