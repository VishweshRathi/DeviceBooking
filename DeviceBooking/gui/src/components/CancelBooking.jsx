import React from 'react';
import axios from "axios/index";

const Timestamp = require('react-timestamp');

export default class CancelBooking extends React.Component {

    constructor() {
        super();
        this.state = {
            index: null,
            detailFlag: false,
            token: localStorage.getItem("token"),
            deviceDetails: [],
            deviceBookingDetails: []
        }

    }

    updateList() {
        console.log("sjdbfjshdfk");
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
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    componentWillMount() {
        this.updateList();
        if (!localStorage.getItem("token")) {
            this.props.history.push("/home/login")
        }
    }


    showBookingDetails(index) {
        const {deviceDetails} = this.state;
        this.setState({index:index,detailFlag: true, deviceBookingDetails: deviceDetails[index].deviceAllocated});
    }

    goBack() {
        this.setState({detailFlag: false})
    }




    cancelThis(index){
        let deviceDetails1 = this.state.deviceDetails[this.state.index];
        let deviceDetails = this.state.deviceBookingDetails[index];
        deviceDetails1.token=this.state.token;
        deviceDetails1.deviceDetails=deviceDetails;
        var authOptions = {
            method: 'post',
            url: 'http://localhost:3007/userhome/cancelbooking',
            data: deviceDetails1,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };
        axios(authOptions)
            .then((response) => {
               alert(response.data)

                // this.setState({deviceDetails: response.data})
                // this.setState({deviceDetails:deviceDetails1.deviceAllocated.splice(index,1)})
                this.updateList();
                // console.log("dlfkjhglsdf");
                this.setState({detailFlag: true, deviceBookingDetails: deviceDetails[this.state.index].deviceAllocated});

            })
            .catch(function (error) {
                console.log(error);
            });





    }
    render() {
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
                <td>
                    <input type="button" value="Cancel Booking" onClick={this.cancelThis.bind(this, i)}/>
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