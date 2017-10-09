activitys = new Mongo.Collection('activitys');
activitysSchema = new SimpleSchema({
    name: {
        type: String
    },
    date: {
        type: Date
    },
    place: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String,
        optional: true
    },
    confirmation: {
        type: Boolean,
        defaultValue: false
    }
});