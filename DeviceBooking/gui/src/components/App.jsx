import React from 'react';
import Login from './Login.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import AdminNavigation from './AdminNavigation.jsx';
import UserNavigation from './UserNavigation.jsx';
import Body from './Body.jsx';
import {Link} from 'react-router';
// import Footer from './Signup.jsx';
import {Router, Route} from "react-router";
import HomeNavigation from "./HomeNavigation.jsx";

class App extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Header/>
                    {this.props.children}
                    <Footer/>
                </div>

            </div>
        );
    }
}

export default App;