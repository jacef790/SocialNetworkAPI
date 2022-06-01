const { Schema, model} = require('mongoose');
const Reactions = require('./Reactions');

const thoughtsSchema = new Schema(
    {
        thoughtText: {
          type: String,
          required: true,
          maxlength: 280,
          minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
          },
        username: {
            type: String,
            required: true
        }  ,
        reactions: [Reactions]     
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


thoughtsSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thoughts = model("thought", thoughtsSchema);

module.exports = Thoughts;