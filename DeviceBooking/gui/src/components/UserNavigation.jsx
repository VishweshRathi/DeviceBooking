 import React from 'react';
import {Link} from 'react-router-dom';
 var jwt = require("jsonwebtoken");

export default class UserNavigation extends React.Component {
    Logout() {
        localStorage.removeItem("token")
        this.props.history.push("/home/login")
    }

    componentWillMount(){
        var role =  jwt.decode(localStorage.getItem("token"));
        console.log(role.userId)
        if(role.userId =='admin'){
            localStorage.removeItem("token")
            this.props.history.push("/home/login")
        }
    }
    render(){
        return(
            <div>
                <div className="container-fluid">
                    <div className="row">
                                <nav className="navbar navbar-inverse">
                                    <div className="navbar-header">
                                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </button>
                                    </div>
                                    <div className="collapse navbar-collapse" id="myNavbar">
                                        <ul className="nav navbar-nav">
                                            <li><Link to='/user'>Home</Link></li>
                                            <li><Link to='/user/bookdevice'>Book Device</Link></li>
                                            <li><Link to='/user/bookinghistory'>Booking History</Link></li>
                                            <li><Link to='/user/cancelbooking'>Cancel Booking</Link></li>
                                        </ul>
                                        <ul className="nav navbar-nav navbar-right ">
                                            <button type="button" className="logout-button" onClick={this.Logout.bind(this)}><span
                                                className="glyphicon glyphicon-log-out"></span> Log out
                                            </button>

                                        </ul>
                                    </div>
                                </nav>
                    </div>
                    </div>

            </div>
        )
    }
}