import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import HomeActivity from '../Screen/HomeActivity/HomeActivity'
import RentActivity from '../Screen/RentActivity/RentActivity'
import LoginActivity from '../Screen/AccountActivity/LoginActivity'
import TravelActivity from '../Screen/TravelActivity/TravelActivity'
import RentForumActivity from "../Screen/RentActivity/RentForumActivity";
import OrderActivity from "../Screen/OrderActivity/OrderActivity";
import AdminActivity from "../Screen/AdminActivity/AdminActivity";
import InformationActivity from "../Screen/InformationActivity/InformationActivity";
class RouterChild extends  Component {

    render(){
        return(
            <div>
                <Route exact path="/" component={HomeActivity}/>
                <Route path="/rent" component={RentActivity}/>
                <Route path="/rent_forum" component={RentForumActivity}/>
                <Route path="/order" component={OrderActivity}/>
                <Route path="/travel" component={TravelActivity}/>
                <Route path="/login" component={LoginActivity}/>
                <Route path="/admin" component={AdminActivity}/>
                <Route path="/information" component={InformationActivity}/>
            </div>
        )
    }
}
export default RouterChild