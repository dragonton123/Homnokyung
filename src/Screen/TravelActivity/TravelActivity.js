import React, { Component } from 'react';
import { get } from '../../Service/Service'
import {
    brand,
    Container,
    Content,Table,Column,Footer ,Icon} from 'bloomer';

class TravelActivity extends Component {

    constructor(){
        super()
        this.state={
            isActive:false,
            order_data:[]
        }
    }

    onClickNav = () => {
        this.setState({
            isActive:!this.state.isActive
        })
    }
    get_order = async () => {
        try{
            await  get('order/get_land_order',sessionStorage.getItem('user_token')).then((res)=>{
                if(res.success){
                    this.setState({order_data:res.result})
                }else{
                    console.log(res.error_message)
                }
            })
        }catch(err){
            console.log(err)
        }
    }

    componentDidMount = () => {
        this.get_order()
    }
    render() {
        return (
            <div >

                <div style={{display:"flex",marginTop:50,justifyContent:"center"}}>
                    <div style={{width: "80%",borderRadius:5,display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"center"}}>

                        <div style={{fontSize:30,marginTop:10,fontWeight:"bold"}}>
                            การท่องเที่ยว
                        </div>

                        <iframe width="877" height="375" src="https://www.youtube.com/embed/zgXT3hGx2Iw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                        <iframe width="667" height="375" src="https://www.youtube.com/embed/Iyd6zs6PfKc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                    </div>
                </div>

            </div>
        );
    }
}

export default TravelActivity;