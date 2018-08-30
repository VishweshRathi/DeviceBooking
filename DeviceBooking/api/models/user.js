var mongoose = require("mongoose");
var newUserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    emailId: {
        type: String,
        unique: true,
        require: true

    },
    mobileNumber: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        default: "user"
    }
})

var newUserModel = mongoose.model('User', newUserSchema);

newUserModel.createUser = function (newUser, callback) {
    newUser.save(callback);
};

newUserModel.findByEmail = function (email, callback) {
    newUserModel.findOne({'emailId': email}, callback);
}
newUserModel.findById = function (id, callback) {
    newUserModel.findOne({'_id': id}, callback);
}

newUserModel.showUsers = function (callback) {
    newUserModel.find({}, callback);
};

module.exports = newUserModel;