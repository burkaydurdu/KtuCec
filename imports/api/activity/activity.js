activitys = new Mongo.Collection('activitys');
activitysSchema = new SimpleSchema({
    image: {
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: Date
    },
    place: {
        type: String
    },
    description: {
        type: String,
        optional: true
    },
    owner: {
        type: String
    },
    join: {
        type: [String],
        optional: true
    },
    confirmation: {
        type: Boolean,
        defaultValue: false
    }
});