import React from 'react';
import {Link} from 'react-router-dom'
import BookDevice from './BookDevice.jsx';
import UserDetails from './UserDetails.jsx';
import BookingHistory from './BookingHistory.jsx';
import CancelBooking from './CancelBooking.jsx';
export default class UserBody extends React.Component {
    render(){
        return(
            <div>
            	<BookDevice></BookDevice>
            	<UserDetails></UserDetails>
            	<BookingHistory></BookingHistory>
            	<CancelBooking></CancelBooking>
            </div>
        )
    }
}