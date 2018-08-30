import React from 'react';
import axios from "axios/index";

const Timestamp = require('react-timestamp');
export default class ShowDevices extends React.Component {

    constructor() {
        super();
        this.state = {
            detailFlag: false,
            token: localStorage.getItem("token"),
            deviceDetails: [],
            deviceBookingDetails: [],
            now: new Date()
        }

    }

    updateList() {
        var authOptions = {
            method: 'post',
            url: 'http://localhost:3007/userhome/showuserdevices',
            data: this.state,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };
        axios(authOptions)
            .then((response) => {
                this.setState({deviceDetails: response.data})
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    componentDidMount() {
        this.updateList()
        if (!localStorage.getItem("token")) {
            this.props.history.push("/home/login")
        }
    }


    showBookingDetails(index) {
        const {deviceDetails} = this.state;
        console.log("Details:----------", deviceDetails[index].deviceAllocated);
        this.setState({detailFlag: true, deviceBookingDetails: deviceDetails[index].deviceAllocated});
    }

    goBack() {
        this.setState({detailFlag: false})
    }

    render() {
        console.log(this.state)
        const {deviceDetails, deviceBookingDetails, detailFlag} = this.state;
        const displayDevices = deviceDetails.map((element, i) => {
            return (<tr key={i}>
                <td>
                    {element.name}
                </td>
                <td>
                    {element.deviceId}
                </td>
                <td>
                    <input type="button" Value="Details" onClick={this.showBookingDetails.bind(this, i)}/>

                </td>
            </tr>)
        });

        const bookingDetails = deviceBookingDetails.map((element, i) => {
            return (<tr key={i}>

                <td>
                    {element.userAllocated}
                </td>

                <td>
                    <Timestamp time={element.startTime / 1000} format="full"/>
                </td>
                <td>
                    <Timestamp time={element.endTime / 1000} format="full"/>
                </td>

            </tr>)
        })

        if (!detailFlag) {

            return (

                <div className="container-fluid">
                    <div className="row content">
                        <div className="col-sm-1 col-md-2 col-lg-3">
                        </div>
                        <div className="col-sm-10 col-md-10 col-lg-6 "><br/><br/>
                            <div className="panel panel-success">
                                <div className="panel-heading">Devices</div>
                                <div className="panel-body text-center">

                                    <table class="table table-hover">
                                        <thead>
                                        <tr>
                                            <th className="text-center">Name</th>

                                            <th className="text-center">DeviceId</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {displayDevices}
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
        } else {

            return (

                <div className="container-fluid">
                    <div className="row content">
                        <div className="col-sm-1 col-md-2 col-lg-3">
                        </div>
                        <div className="col-sm-10 col-md-10 col-lg-6 "><br/><br/>
                            <div className="panel panel-success">
                                <div className="panel-heading">Devices</div>
                                <div className="panel-body text-center">

                                    <table class="table table-hover">
                                        <thead>
                                        <tr>

                                            <th className="text-center">User Allocated</th>

                                            <th className="text-center">Start Time</th>

                                            <th className="text-center">End Time</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {bookingDetails}
                                        </tbody>
                                    </table>
                                    <input type="button" Value="Back" onClick={this.goBack.bind(this)}/>
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

}