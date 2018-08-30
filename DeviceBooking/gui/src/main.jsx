import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Body from './components/Body.jsx';
import DeleteDevice from './components/DeleteDevice.jsx';
import AddDevice from './components/AddDevice.jsx';
import ShowDevices from './components/ShowDevices1.jsx';
import ShowUsers from './components/ShowUsers.jsx';
import BookDevice from './components/BookDevice.jsx';
import UserDetails from './components/UserDetails.jsx';
import BookingHistory from './components/BookingHistory.jsx';
import CancelBooking from './components/CancelBooking.jsx';
import AdminNavigation from './components/AdminNavigation.jsx'
import UserNavigation from './components/UserNavigation.jsx'
import HomeNavigation from './components/HomeNavigation.jsx'

import {BrowserRouter as Router, Route, IndexRoute,useRouterHistory } from "react-router-dom";
import {browserHistory} from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>
        <div>
            <App>
                <Route path="/home" component={HomeNavigation} />
                <Route path="/admin" component={AdminNavigation} />
                <Route path="/user" component={UserNavigation} />
                <Route exact path="/home" component={Body}/>
                <Route exact path="/admin" component={Body}/>
                <Route exact path="/user" component={Body}/>
                <Route exact path="/home/login" component={Login} />
                <Route path="/home/signup" component={Signup} />
                <Route path="/admin/deletedevice" component={DeleteDevice} />
                <Route path="/admin/adddevice" component={AddDevice} />
                <Route path="/admin/showdevices" component={ShowDevices} />
                <Route path="/admin/showusers" component={ShowUsers} />
                <Route path="/user/bookdevice" component={BookDevice} />
                <Route path="/user/userdevice" component={UserDetails} />
                <Route path="/user/bookinghistory" component={BookingHistory} />
                <Route path="/user/cancelbooking" component={CancelBooking} />

            </App>
        </div>
    </Router>, document.getElementById('app'));
