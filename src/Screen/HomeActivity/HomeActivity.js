import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import './HomeActivity.css'
import {
    brand,
    Container,
    Content,Columns,Column,Footer ,Icon} from 'bloomer';
import Banner01 from '../../assets/image/Home/Banner01.jpg'
import Banner02 from "../../assets/image/Home/Banner02.jpg"
import Banner03 from "../../assets/image/Home/Banner03.jpg"
class HomeActivity extends Component {

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
    render() {
        return (
            <div >
                <div style={{paddingBottom:120}} >
                <Carousel style={{marginTop:20, width:"100%",height:600}} infiniteLoop={true} showThumbs={false} autoPlay={true} showArrows={true} >
                    <div>
                        <img  src={Banner01}  style={{width:"100%",height:"60%"}} />
                    </div>
                    <div>
                        <img  src={Banner02}  style={{width:"100%",height:"60%"}} />
                    </div>
                    <div>
                        <img  src={Banner03}  style={{width:"100%",height:"60%"}} />
                    </div>
                </Carousel>
                </div>


                <footer className='footer'>
                    <p  className='footer_paragraph' >คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา 56000</p>
                    <p>Copyright <a style={{fontFamily:"sans-serif",color:"green",fontSize:16}} >©</a> 2017 Inc.</p>
                </footer>


            </div>
        );
    }
}

export default HomeActivity;
