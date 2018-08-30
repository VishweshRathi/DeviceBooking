import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
//export default withRouter(Login);
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: "" ,
            password: ""
        }
    }

    IdPrint(id) {
        this.setState({
                emailId: id.target.value
            }
        )
    };

    PasswordPrint(pass) {
        this.setState({
                password: pass.target.value
            }
        )
    };


    FormSubmit() {
        const {emailId, password} = this.state;
        if (emailId === "" && password === "") {
            alert("Please enter complete information");
        }else{
            if(emailId === ""){
                alert("Please enter EmailId");
                this.props.history.push("/home/login")
            }else if(password === ""){
                alert("Please enter Password");
            }else{
                console.log("Inside API CALL LOGIN");
                const authOptions = {
                    method: 'post',
                    url: 'http://localhost:3007/login',
                    data: this.state,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    json: true
                };
                axios(authOptions)
                    .then((response) => {

                        localStorage.setItem("token", response.data.token);
                        if (response.data.role == "admin") {
                            this.props.history.push("/admin")

                        }
                        else if (response.data.role == "user") {
                            this.props.history.push("/user")

                        }

                    })
                    .catch(function (error) {
                        alert(error.response.data)
                    });
            }
        }


    }

    render() {
        return (
            <div className="container"><br/><br/><br/><br/>
                <div className="form-signin">
                    <h2 className="form-signin-heading">Please Login</h2><br/>
                    <label className="must">User Id</label>
                    <input type="text" className="form-control " placeholder="User ID"
                           onChange={this.IdPrint.bind(this)}/><br/>
                    <label className="must">Password</label>
                    <input type="password" required className="form-control" placeholder="Password"
                           onChange={this.PasswordPrint.bind(this)}/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit"
                            onClick={this.FormSubmit.bind(this)}>Login
                    </button>
                    <br/><br/><br/><br/><br/><br/>
                </div>
            </div>


        )
    }
}

export default withRouter(Login);