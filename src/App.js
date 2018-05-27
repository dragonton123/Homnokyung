import React, { Component } from 'react';
import logo from './logo.svg';
import 'bulma/css/bulma.css';
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RouterChild from './Static/Router'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import brand from "./assets/image/Banner_logo.png"
import { Navbar,
    NavbarBrand ,
    NavbarEnd,
    NavbarItem,
    NavbarBurger,
    NavbarMenu,
    NavbarStart,
    Icon} from 'bloomer'

var jwtDecode = require('jwt-decode');

class App extends Component {

    constructor(){
        super()
        this.state={
            isActive:false
        }
    }

    onClickNav = () => {
        this.setState({
            isActive:!this.state.isActive
        })
    }

    onLogout =  () => {
        sessionStorage.removeItem('user_token')
        window.location.href="/"
    }
  render() {
        // console.log("#============>",localStorage.getItem("user_token")!==undefined?jwtDecode(localStorage.getItem("user_token")):"eiei")
    return (
        <Router>
            <div>
                  <Navbar >
                      <NavbarBrand>
                          <NavbarItem>
                              <Link className="link" to="/">
                                <img src={brand} style={{ marginRight: 5 }} />
                              </Link>
                          </NavbarItem>
                          <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
                      </NavbarBrand>
                      <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
                          <NavbarStart>
                              <NavbarItem ><Link className="link" to="/product">  สินค้า </Link></NavbarItem>
                              <NavbarItem ><Link className="link" to="/rent">  เช่าที่นา </Link> </NavbarItem>
                              <NavbarItem ><Link className="link" to="/travel"> ท่องเที่ยว</Link> </NavbarItem>
                              {
                                  sessionStorage.getItem("user_token") !== null ?
                                    <NavbarItem ><Link className="link" to="/order"> รายการสั่งซื้อ</Link> </NavbarItem>
                                  :null
                              }
                              {
                                  sessionStorage.getItem("user_token") !== null ?
                                      <NavbarItem ><Link className="link" to="/information"> ข้อมูลผู้ใช้้</Link> </NavbarItem>
                                      :null
                              }
                              {
                                  sessionStorage.getItem("user_token") !== null ?

                                      jwtDecode(sessionStorage.getItem("user_token")).type > 0?
                                  <NavbarItem ><Link className="link" to="/admin"> Admin</Link></NavbarItem>

                                  :null
                                  :null
                              }
                               </NavbarStart>
                          <NavbarEnd>
                              <NavbarItem  style={{paddingLeft:40,paddingRight:40}}>
                                  {sessionStorage.getItem("user_token") !== null ?
                                      <div style={{cursor:"pointer"}} onClick={()=>this.onLogout()}> Log out</div>
                                      :<Link className="link" to="/login"> Login </Link> }
                              </NavbarItem>
                          </NavbarEnd>
                      </NavbarMenu>
                  </Navbar>
                <div className="router_child" style={{paddingTop:60}}>
                    <RouterChild />
                </div>
            </div>
        </Router>
    );
  }
}

export default App;
