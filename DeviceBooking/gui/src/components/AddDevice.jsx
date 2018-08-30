import React from 'react';
import axios from "axios/index";

export default class AddDevice extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            deviceId: "",
            token: localStorage.getItem("token")
        }
    }

    getName(val) {
        this.setState({
            name: val.target.value
        })
    }

    getId(id) {
        this.setState({
            deviceId: id.target.value
        })
    }

    addDevice() {
        var {name, deviceId} = this.state
        if(name =="" && deviceId == ""){
            alert("Please fill complete information")
        }else{
            if(name == ""){
                alert("Please select Device Category")
            }else if(deviceId == ""){
                alert("Please enter Device Id")
            }
            else{
                console.log(this.state);
                var authOptions = {
                    method: 'post',
                    url: 'http://localhost:3007/adminhome/adddevice',
                    data: this.state,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    json: true
                };
                axios(authOptions)
                    .then((response) => {
                        alert(response.data);

                         if(response.data == "Device Added Successfully"){
                              console.log(response.data)
                              this.setState({name:"",deviceId:""})

                         }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
    componentDidMount() {
        if(!localStorage.getItem("token")){
            this.props.history.push("/home/login")
        }
    }

    render() {
        return (
            <div>{/*className="container-fluid"*/}
                <div className="row content">
                    <div className="col-sm-1 col-md-2 col-lg-3">
                    </div>
                    <div className="col-sm-10 col-md-10 col-lg-6 text-center"><br/><br/>
                        <div className="panel panel-primary ">
                            <div className="panel-heading text-center">Add Device</div>
                            <div className="panel-body">
                                <form>
                                    <label className="control-label must">Select category </label>

                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        {/*Category dropdown box*/}
                                        <div className="col-md-6">
                                            <select className="form-control" value={this.state.name} onChange={this.getName.bind(this)}>
                                                <option value="">--Select--</option>
                                                <option value="Lenovo">Lenovo</option>
                                                <option value="Oppo">Oppo</option>
                                                <option value="Vivo">Vivo</option>
                                                <option value="Sony">Sony</option>
                                                <option value="Samsung">Samsung</option>
                                                <option value="Acer">Acer</option>
                                                <option value="iphone">iphone</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                        </div>

                                    </div>
                                    <br/>

                                    <label className="control-label must" >Device Id </label>
                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" id="deviceid"
                                                   placeholder="Enter deviceid" value={this.state.deviceId} onChange={this.getId.bind(this)}
                                                   required/>
                                            <br/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-6">
                                            <button className="btn btn-lg btn-primary btn-block" type="button"
                                                    onClick={this.addDevice.bind(this)}>Submit
                                            </button>
                                            <br/>
                                        </div>
                                    </div>

                                </form>
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
