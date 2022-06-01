const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: [ isEmail, "invalid email" ]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thoughts"
    }],
    friends: [{
        
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],
    
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

usersSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});


const User = model('user', usersSchema);

module.exports = User;

