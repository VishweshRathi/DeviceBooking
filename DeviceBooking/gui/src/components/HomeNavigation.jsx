import React from 'react';
import {Link} from 'react-router-dom';


export default class HomeNavigation extends React.Component {
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <nav className="navbar navbar-inverse">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse"
                                        data-target="#myNavbar">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand">Welcome</a>
                            </div>
                            <div className="collapse navbar-collapse" id="myNavbar">
                                <ul className="nav navbar-nav">
                                    <li className="active"><Link to='/home'>Home</Link></li>


                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to='/home/login'><span className="glyphicon glyphicon-log-in"></span>Login</Link></li>
                                    <li><Link to='/home/signup'><span className="glyphicon glyphicon-user"></span>Signup</Link></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        )
    }
}