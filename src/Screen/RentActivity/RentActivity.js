import React, { Component } from 'react';
import './RentActivity.css'
import logo from '../../assets/image/Rent/Rent_logo.png'
import RentColumn from "../../Component/RentComponent/RentColumn";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import { get } from "../../Service/Service"
import swal from 'sweetalert';
class RentActivity extends Component {

    constructor(){
        super()
        this.state={
            isActive:false,
            data_land_column:[]
        }
    }
    get_land_column = async  () => {
        try{
            await get("land/get_land_list",null).then((res)=>{
                if(res.success){
                    console.log(res.result)
                    this.setState({ data_land_column:res.result })
                }else{
                    swal(res.error_message, {
                        buttons: {cancel:"ตกลง"},
                    });
                }
            })
        }catch(err){
            console.log(err)
        }
    }

    componentDidMount = () => {
        this.get_land_column()
    }


    render() {
        return (
            <div style={{paddingBottom:50 }} >
                <div style={{alignItems:"center",textAlign:"center"}}>
                    <img style={{margin:"auto", width:120,height:120}} src={logo} />
                    <h1 className="header_style">เช่าที่นา</h1>
                </div>
            <div className="rent_page" >
                <div className="rent_column">
                    <div className="media_content" style={{width:"90%"}}>
                        {
                            this.state.data_land_column !== [] ?
                                this.state.data_land_column.map((element,index)=>{
                                   return <Link key={index} className="link_content" to={{ pathname: '/rent_forum', params: element }} > <RentColumn {...element}/> </Link>
                                })
                        :null

                        }
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default RentActivity;
