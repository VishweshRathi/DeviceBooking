var mongoose = require("mongoose");
var ObjectID = require("mongodb").ObjectID;

var newDeviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    deviceId: {
        type: String,
        unique: true,
        required: true,
    },
    deviceAllocated: [
        {
            startTime: {
                type: String,


            },
            endTime: {
                type: String,

            },
            allocated: {
                type: Boolean,

            },
            userAllocated: {
                type: String,

            }

        }
    ]
});

var newDeviceModel = mongoose.model('Devices', newDeviceSchema);

newDeviceModel.addDevice = function (newDevice, callback) {
    newDevice.save(callback);
};

newDeviceModel.deleteDevice = function (deviceId, name, callback) {
    newDeviceModel.remove({'deviceId': deviceId, 'name': name}, callback);
};

newDeviceModel.cancelbooking = function (device_id,booking_id, callback) {
    newDeviceModel.update(
        {'_id': ObjectID(device_id)},
        { $pull: { "deviceAllocated" : { _id: ObjectID(booking_id) } } },callback
    );
};

newDeviceModel.showDevices = function (callback) {
    newDeviceModel.find({}, callback);
};

newDeviceModel.showUserDevices = function (emailId,callback) {
    newDeviceModel.aggregate([


        {
            $unwind: '$deviceAllocated'
        },
        {
            $match: {
              //  'deviceId' : deviceId,
              //  'name' : name,
                'deviceAllocated.userAllocated': emailId
            }
        },
        {
            $group: {
                '_id': '$_id',

                'name' :{
                  '$first' : '$name'
                },
                'deviceId' :{
                  '$first' : '$deviceId'
                },

                'deviceAllocated': {
                    '$addToSet':'$deviceAllocated'

                }
                
            }
        }
    ], callback);

};



newDeviceModel.giveDeviceId = function (name, callback) {
    newDeviceModel.find({'name': name}, callback);
    console.log("Inside giveDevice ID")
};

newDeviceModel.bookDevice = function (deviceId, callback) {
    newDeviceModel.findOne({'deviceId': deviceId}, callback);

}

newDeviceModel.isDeviceAllocaed = function (deviceId, startTime, endTime, callback) {
    var condition = {$and: [{'deviceId': deviceId}, {'deviceAllocated.startTime': {$lte: startTime}}, {'deviceAllocated.endTime': {$gt: startTime}}]}
    newDeviceModel.findOne(condition, callback);
}


module.exports = newDeviceModel;