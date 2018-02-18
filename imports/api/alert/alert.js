alerts = new Mongo.Collection('alerts');
alertsSchema = new SimpleSchema({
    createdAt: {
        type: Date
    },
    content: {
        type: String
    },
    owner: {
        type: String
    }
});