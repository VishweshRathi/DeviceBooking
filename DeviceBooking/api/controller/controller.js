var express = require('express');
var app = express();
var mongoose = require("mongoose");
var Users = require('../models/user.js');
var Devices = require('../models/device.js');
var jwt = require("jsonwebtoken");
var config = require("../config.js");
var moment = require('moment');

// exports.signup = function (req, res) {
//     var data = req.body;
//     console.log('Inside Signup Controller ');
//     var newUserObj = {
//         firstName: data.firstName,
//         lastName: data.lastName,
//         password: data.password,
//         emailId: data.emailId,
//         mobileNumber: data.mobileNumber,
//         role: data.role
//     };
//     var createUser = new Users(newUserObj);
//     var emailId = data.emailId;
//     Users.createUser(createUser, function (err, dbUser) {
//         if (err) {
//             console.log("err :", err);
//         } else {
//             console.log("User created succcessfully");
//         }
//     });
// };

exports.home = function (req, res) {
    var data = req.body;
    var decodedInfo = jwt.decode(req.body.token);
    Users.findById(decodedInfo.userId, function (err, userById) {
        if (err) {
            res.send("Error inside Home API");
        } else {
            res.send(userById)
        }
    });

}

exports.logout = function (req, res) {
    var token = req.body.token;
    console.log("Remove this from localstorage frontend");
}

exports.login = function (req, res) {
    var data = req.body;
    Users.findByEmail(data.emailId, function (err, userByEmail) {
        console.log("Inside Login API");
        if (err) {
            res.send("Error", err);
        } else {
            if (!userByEmail) {
               res.status(404).send("User not Found");
            } else {
                if (data.password == userByEmail.password) {
                    token = createToken({userId: userByEmail.emailId});
                    UserInfo = {
                        token: token,
                        firstName: userByEmail.firstName,
                        lastName: userByEmail.lastName,
                        emailId: userByEmail.emailId,
                        role: userByEmail.role,
                        mobileNumber: userByEmail.mobileNumber,
                        id: userByEmail._id
                    }
                    res.status(200).send(UserInfo);
                } else {
                    res.status(401).send("Invalid User Credentials")
                }
            }
        }
    })
};

exports.signup = function (req, res) {
    var data = req.body;
    console.log('Inside Signup Controller ');
    var newUserObj = {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        emailId: data.emailId,
        mobileNumber: data.mobileNumber,
        role: data.role
    };
    var createUser = new Users(newUserObj);
    var emailId = data.emailId;
    Users.createUser(createUser, function (err, dbUser) {
        if (err) {
            if (err.code == 11000) {
                res.status(200).send("User already exist");
            } else {
                res.send(err);
            }
        } else {
            res.status(200).send("SignUp successfully");
        }
    });
};

exports.addDevice = function (req, res) {
    var data = req.body;
    console.log('Inside Add device Controller ');
    var newDeviceObj = {
        name: data.name,
        deviceId: data.deviceId,
        // deviceAllocated: {
        //     startTime: null,
        //     endTime: null,
        //     allocated: false,
        //     userAllocated: null
        // }
    };
    var newDevice = new Devices(newDeviceObj);
    Devices.addDevice(newDevice, function (err, dbUser) {
        if (err) {
            if (err.code == 11000) {
                res.send("Error : Device Already Present");
            } else {
                res.send(err);
            }
        } else {
            res.status(200).send("Device Added Successfully")
        }
    });
};

exports.deleteDevice = function (req, res) {
    var data = req.body;
    Devices.deleteDevice(data.deviceId,data.name,function (err, dbUser) {
        if (err) {
            console.log("err :", err);
        } else {
            if (dbUser.result.n) {
                res.send(dbUser.result.n + " Device Deleted succcessfully");
            } else {
                res.send("Device Not Found");
            }
        }
    });
};

exports.cancelbooking= function (req, res) {
    var data = req.body;
     device_id = data._id
    booking_id = data.deviceAllocated[0]._id
    console.log(device_id,"-------------",booking_id)
    Devices.cancelbooking(device_id, booking_id,function (err, dbUser) {
        if (err) {
            console.log("err :", err);
        } else {
            console.log("inside")
                res.send("Booking cancelled succcessfully");
        }
    });
};




exports.showDevices = function (req, res) {
    var data = req.body;
    Devices.showDevices(function (err, deviceList) {
        if (err) {
            console.log("err :", err);
        } else {
            res.send(deviceList)
        }
    });
}

exports.showUsersDevices = function (req, res) {
    var data = req.body;
    var emailId = jwt.verify(data.token,config.secret).userId;
    Devices.showUserDevices(emailId,function (err, deviceList) {
        if (err) {
            console.log("err :", err);
        } else {
            res.send(deviceList)
        }
    });
}


exports.giveDeviceId = function (req, res) {
    var data = req.body;
    Devices.giveDeviceId(data.name,function (err, deviceList) {
        if (err) {
            console.log("err :", err);
        } else {
            res.send(deviceList)
        }
    });
}

exports.showUsers = function (req, res) {
    var data = req.body;
    console.log('Inside show device Controller ');
    Users.showUsers(function (err, userList) {
        if (err) {
            console.log("err :", err);
        } else {
            console.log("Device list", userList);
            res.send(userList)
        }
    });
}

exports.bookDevice = function (req, res) {
    var data = req.body;
    console.log("Inside Booking Device API");
    var startTime = new Date (data.startTime+"+05:30").getTime()
    var nowTime = new Date().getTime()
    var maxTime = nowTime + 86400000
    var endTime = startTime + 3600000;
    var emailId = jwt.verify(data.token,config.secret);
    console.log(new Date(startTime))
    if(startTime >= nowTime && startTime <maxTime){
        Devices.isDeviceAllocaed(data.deviceId, startTime, endTime, function (err, deviceList) {
            if (true) {
                Devices.bookDevice(data.deviceId, function (err, device) {
                    if (data.deviceId === device.deviceId && deviceList == null) {
                        device.deviceAllocated.push({
                            startTime: startTime,
                            endTime: endTime,
                            allocated: true,
                            userAllocated: emailId.userId
                        })
                        device.save();
                        res.send("Booked")
                    } else {
                        res.send("Please select other timeslot")
                    }
                });


            }
        });
    }else{
        res.send("Select time for next 24 Hrs")
    }

}


// device.deviceAllocated.startTime = data.startTime;
// device.deviceAllocated.endTime = data.endTime;
// device.deviceAllocated.userAllocated = data.emailId;
// device.deviceAllocated.allocated =true;
// device.save();
// res.send(device);
//


//{
//     var data = req.body;
//     console.log("Inside bookDevice APi");
//     Devices.bookDevice(data.deviceId, function (err, device) {
//         var startTime = new Date(data.date);
//         var endTime = device.expireDate;
//         Devices.isDeviceAllocaed(data.deviceId,startTime,endTime,function(err,deviceList){
//             console.log(deviceList);
//         })
//         console.log("-----",expireDate,"------",receivedDate)
//         if (err) {
//             console.log("Error", err);
//         } else {
//             if (data.deviceId === device.deviceId ) {
//                 if ( receivedDate.getTime() > expireDate.getTime()) {
//                     device.allocatedDate = new Date();
//                     device.expireDate = receivedDate.setHours(receivedDate.getHours() + 1);
//                     device.userAllocated = data.emailId;
//                     device.save();
//                     res.send(device);
//                 } else {
//                     res.send("device already booked");
//                 }
//             }
//         }
//
//     })
// }


var createToken = function (id) {
    console.log("Inside Create Token Function");
    var token = jwt.sign(id, config.secret, {
        expiresIn: 4000
    })
    return token;
}
