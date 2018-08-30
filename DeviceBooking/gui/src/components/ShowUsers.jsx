import React from 'react';
import axios from "axios/index";

export default class ShowDevices extends React.Component {
    constructor() {
        super();
        this.state = {
            token: localStorage.getItem("token"),
            data: []
        }
    }
    componentDidMount() {
        if(!localStorage.getItem("token")){
            this.props.history.push("/home/login")
        }
    }

    componentWillMount() {
        var authOptions = {
            method: 'post',
            url: 'http://localhost:3007/adminhome/showusers',
            data: this.state,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };
        axios(authOptions)
            .then((response) => {

                this.setState({data: response.data})


            })
            .catch(function (error) {
                alert(error);
            });
    }


    render() {

        var displayUsers = this.state.data.map((element, i) => {
            return (<tr key={i}>
                <td>
                    {element.firstName}
                </td>
                <td>
                    {element.lastName}
                </td>
                <td>
                    {element.emailId}
                </td>
                <td>
                    {element.mobileNumber}
                </td>
                <td>
                    {element.role}
                </td>

            </tr>)
        })
        return (

            <div className="container-fluid">
                <div className="row content">
                    <div className="col-sm-1 col-md-2 col-lg-3">
                    </div>
                    <div className="col-sm-10 col-md-10 col-lg-6 "><br/><br/>
                        <div className="panel panel-success">
                            <div className="panel-heading">Users</div>
                            <div className="panel-body text-center">

                                <table className="table table-hover" >
                                    <thead>
                                    <tr >
                                        <th className="text-center">First Name</th>
                                        <th className="text-center">Last Name</th>
                                        <th className="text-center">Email Id</th>
                                        <th className="text-center">Mobile</th>
                                        <th className="text-center">Role</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {displayUsers}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-1 col-md-2 col-lg-2">
                    </div>
                </div>
            </div>

        )
    }

}