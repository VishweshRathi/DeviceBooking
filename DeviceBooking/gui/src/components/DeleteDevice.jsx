import React from 'react';
import axios from "axios/index";

export default class DeleteDevice extends React.Component {


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
    componentDidMount() {
        if(!localStorage.getItem("token")){
            this.props.history.push("/home/login")
        }
    }

    deleteDevice() {
        if(!localStorage.getItem("token")){
                this.props.history.push("/home/login")
            }else{
            console.log(this.state);
            var authOptions = {
                method: 'post',
                url: 'http://localhost:3007/adminhome/deletedevice',
                data: this.state,
                headers: {
                    'Content-Type': 'application/json'
                },
                json: true
            };
            axios(authOptions)
                .then((response) => {
                    console.log(response);
                    alert(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }


    }


    render() {
        return (

            <div className="container-fluid">
                <div className="row content">
                    <div className="col-sm-1 col-md-2 col-lg-3">
                    </div>
                    <div className="col-sm-10 col-md-10 col-lg-6"><br/><br/>
                        <div className="panel panel-danger">
                            <div className="panel-heading">Delete Device</div>
                            <div className="panel-body text-center">
                                <form>
                                    <label className="control-label">Select category </label>

                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        {/*Category dropdown box*/}
                                        <div className="col-md-6">
                                            <select className="form-control" onChange={this.getName.bind(this)}>
                                                <option value="" >--Select--</option>
                                                <option value="Lenovo">Lenovo</option>
                                                <option value="Oppo">Oppo</option>
                                                <option value="Vivo">Vivo</option>
                                                <option value="Sony">Sony</option>
                                                <option value="Samsung">Samsung</option>
                                                <option value="Acer">Acer</option>
                                                <option value="iphone">iphone</option>
                                            </select>
                                        </div>
                                        <br/><br/>
                                    </div>

                                    <label className="control-label">Select Id </label>
                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" id="deviceid"
                                                   placeholder="Enter deviceid" onChange={this.getId.bind(this)}
                                                   required/>
                                            <br/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-6">
                                            <button className="btn btn-lg btn-block btn-danger" type="button"
                                                    onClick={this.deleteDevice.bind(this)}>Delete
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