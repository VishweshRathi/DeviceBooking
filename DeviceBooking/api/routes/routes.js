var Express = require('express');
var Router = Express.Router();
var controller = require('../controller/controller');
var auth = require('../auth.js');

//Login
Router.post('/login', controller.login); //done
//Sign up
Router.post('/signup', controller.signup); //done

Router.post('/home',auth.VerifyToken ,controller.home); //done

Router.post('/logout', controller.logout);

Router.post('/adminhome/adddevice',auth.VerifyToken , controller.addDevice);

Router.post('/adminhome/deletedevice',auth.VerifyToken , controller.deleteDevice);

Router.post('/adminhome/showdevices',auth.VerifyToken , controller.showDevices);

Router.post('/adminhome/showusers',auth.VerifyToken,controller.showUsers);

Router.post('/userhome/bookdevice',auth.VerifyToken ,controller.bookDevice);

Router.post('/userhome/givedeviceid',auth.VerifyToken,controller.giveDeviceId)

Router.post('/userhome/showuserdevices',auth.VerifyToken,controller.showUsersDevices )

Router.post('/userhome/cancelbooking',auth.VerifyToken,controller.cancelbooking )
module.exports = Router;
