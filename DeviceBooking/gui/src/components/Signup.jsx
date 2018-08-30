import React from 'react';
import axios from "axios/index";
import { withRouter } from 'react-router-dom'

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            emailId: "",
            mobileNumber: "",
            password: "",
            repassword: ""
        }
    }

    getVerible(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    frmSubmit() {
        const emailRegex = /^\S+@\S+\.\S+$/;
        const phoneRegEx = /^[789]\d{9}$/;


        var {firstName, lastName, emailId, mobileNumber, password,repassword} = this.state
        if (firstName == "" && lastName == "" && emailId == "" && mobileNumber == "" && password == "" && repassword == "") {
            alert("Please fill complete information")
        } else {
            if (firstName == "") {
                alert("Please enter First Name")
            }
            else if (lastName == "") {
                alert("Please enter Last Name")
            }
            else if (emailId == "") {
                alert("Please enter EmailId")
            }
            else if (!emailId.match(emailRegex)) {
                alert("EmailId format incorrect")
            }
            else if(mobileNumber == ""){
                alert("Please enter Mobile Number")
            }

            else if (!mobileNumber.match(phoneRegEx)) {
                alert("Mobile number format incorrect")
            }
            else if (password == "") {
                alert("Please enter Password")
            } else if(repassword == ""){
                alert("Please confirm your password")
            }else if(repassword !== password){
                alert("Both password should be same")
            }
            else {
                var authOptions = {
                    method: 'post',
                    url: 'http://localhost:3007/signup',
                    data: this.state,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    json: true
                };
                axios(authOptions)
                    .then((response) => {
                        alert(response.data);
                        console.log(response.data)
                        if(response.data == "SignUp successfully"){
                            this.props.history.push("/home/login")
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
        }


    }

    render() {
        return (

            <div className="container"><br/>
                <div className="row">
                    <div className="col-sm-3">

                    </div>
                    <div className="col-sm-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">Registration</div>
                            <div className="panel-body">
                                <form>
                                    <label for="firstname" className="control-label must">Name</label>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input type="text" name="firstName" className="form-control" id="firstName"
                                                   placeholder="Enter First Name"
                                                   onChange={this.getVerible.bind(this)}/>
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" name="lastName" id="lastName"
                                                   placeholder="Enter Last Name" onChange={this.getVerible.bind(this)}/>
                                        </div>
                                    </div>

                                    <label for="emailid" className="control-label padding-top-10 must">Email</label>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input type="email" className="form-control" name="emailId" id="emailId"
                                                   placeholder="Enter Email.." onChange={this.getVerible.bind(this)}/>
                                        </div>
                                    </div>
                                    <label for="mobileno" className="control-label must padding-top-10"
                                           onChange={this.getVerible.bind(this)}>Mobile No.</label>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" id="mobileNumber"
                                                   name="mobileNumber" placeholder="enter mobile no..."
                                                   onChange={this.getVerible.bind(this)}/>
                                        </div>
                                    </div>
                                    <label for="password" className="control-label padding-top-10 must">Choose your
                                        password:</label>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input type="password" className="form-control" id="password"
                                                   name="password" placeholder="enter your password.."
                                                   onChange={this.getVerible.bind(this)}/>
                                        </div>
                                    </div>
                                    <label for="repassword" className="control-label padding-top-10 must">Confirm your
                                        password:</label>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input type="password" className="form-control" id="repassword"
                                                   name="repassword" placeholder="enter password again.."
                                                   onChange={this.getVerible.bind(this)}/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-4"></div>
                                        <div className="col-md-4">
                                            <button className="btn btn-success btn-block" type="button"
                                                    onClick={this.frmSubmit.bind(this)}>Submit
                                            </button>
                                        </div>
                                        <div className="col-md-4"></div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Signup);