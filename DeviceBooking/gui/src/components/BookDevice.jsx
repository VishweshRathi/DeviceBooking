import React from 'react';
import DateTimePicker from 'react-bootstrap-date-time-picker';
import axios from "axios/index";

export default class BookDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            token: localStorage.getItem("token"),
            data: '',
            deviceId: '',
            startTime: '',
            disabled: true,

        }
    }

    displayDeviceId(e) {
        this.setState({name: e.target.value})
        this.setState({deviceId: "--Select--"})
        //this.state.name = "--Select--"
        this.state.disabled = true
    }

    resetState() {
        this.setState({name: "--Select--"})
        this.setState({deviceId: "--Select--"})
        this.setState({date: ""})
        this.state.disabled = true
    }

    bookDevice() {
        var {name, deviceId, startTime} = this.state
        if (name == "--Select--" && name == "" && deviceId == "--Select--" && deviceId == "" && startTime == "") {
            alert("Please select appropriate information")
        } else {
            if (name == "--Select--" || name == "") {
                alert("Please select Device category")
            } else if (deviceId == "--Select--" || deviceId == "") {
                alert("Please select Device Id")
            } else if (startTime == "") {
                alert("Please enter Date & time properly")
            }
            else {
                var authOptions = {
                    method: 'post',
                    url: 'http://localhost:3007/userhome/bookdevice',
                    data: this.state,

                    headers: {
                        'Content-Type': 'application/json'
                    },
                    json: true
                };
                axios(authOptions)
                    .then((response) => {
                        alert(response.data)
                        if(response.data == "Booked"){
                            this.setState({name: "--Select--", deviceId: "--Select--", startTime: ""})
                        }

                    })
                    .catch(function (error) {
                        alert(error);
                    });

            }
        }
    }

    getDetail() {
        this.setState({disabled: false})
        var authOptions = {
            method: 'post',
            url: 'http://localhost:3007/userhome/givedeviceid',
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

    componentDidMount() {

        if (!localStorage.getItem("token")) {
            this.props.history.push("/home/login")
        }
    }

    getDevice(e) {
        this.setState({deviceId: e.target.value})

    }

    getDate(e) {
        this.setState({startTime: e.target.value})
    }

    render() {
        let checkdevices = () => {
            let detail = [];
            if (!this.state.data == '') {
                this.state.data.map((element, i) => {
                    detail.push(<option key={i} value={element.deviceId}>{element.deviceId}</option>)
                })
            }
            else {
                console.log("else")
            }
            return detail;
        }

        return (
            <div className="container">
                <div className="row"><br/><br/><br/>
                    <div className="col-sm-3">

                    </div>
                    <div className="col-sm-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">Book Device</div>
                            <div className="panel-body">
                                <form>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <label htmlFor="firstname" className="control-label must ">Device
                                                Category: </label>
                                        </div>
                                        <div className="col-md-4">
                                            <select className="form-control" value={this.state.name}
                                                    onChange={this.displayDeviceId.bind(this)}>
                                                <option value="" selected>--Select--</option>
                                                <option value="Lenovo">Lenovo</option>
                                                <option value="Oppo">Oppo</option>
                                                <option value="Vivo">Vivo</option>
                                                <option value="Sony">Sony</option>
                                                <option value="Samsung">Samsung</option>
                                                <option value="Acer">Acer</option>
                                                <option value="iphone">iphone</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <button className="btn btn-md btn-block btn-primary"
                                                    onClick={this.getDetail.bind(this)} type="button">Fetch ID
                                            </button>
                                        </div>
                                    </div>
                                    <br/>


                                    <div className="row">
                                        <div className="col-md-4">
                                            <label htmlFor="deviceid" className="control-label must">Device ID:</label>
                                        </div>
                                        <div className="col-md-8">
                                            <select className="form-control" disabled={this.state.disabled}
                                                    value={this.state.deviceId} onChange={this.getDevice.bind(this)}>
                                                <option value="" selected>--Select--</option>
                                                {checkdevices()}
                                            </select>
                                        </div>
                                    </div>
                                    <br></br>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <label htmlFor="mobileno" className="control-label must">Required
                                                Time:</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input type="datetime-local" value={this.state.startTime}
                                                   onChange={this.getDate.bind(this)} className="form-control"
                                                   id="mobileno"
                                                   placeholder="enter mobile no..."/><br/><br/>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-4">
                                        </div>

                                        <div className="col-md-4">
                                            <button className="btn btn-md btn-block btn-success"
                                                    onClick={this.bookDevice.bind(this)} type="button">Book
                                            </button>
                                            <br/>
                                        </div>

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