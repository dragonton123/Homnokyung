import React, { Component } from 'react';

import swal from 'sweetalert';

import { Redirect } from 'react-router';
import {Button} from 'bloomer';
import { ip,post } from '../../Service/Service'
class RentModal extends Component {

    constructor(){
        super()
        this.state={
            isActive:false,
            redirect:false

        }
    }
    build_polygon = (data) => {
        let points = ""
        if(data){
            data.map((element,index)=>{
                points = points+`${element.x},${element.y} `
            })
        }
        return points
    }

    onsubmit = async (land_id) => {

        if(sessionStorage.getItem("user_token") !== null){

            const object = {
                land_id:land_id
            }
            try{
                await post(object,'land/insert_land_order',sessionStorage.getItem("user_token")).then((res)=>{
                    if(res.success){
                        swal("เพิ่มรายการเช่าที่นาสำเร็จ", {
                            icon: "success",
                            buttons: false,
                            timer: 2000,
                        });
                    }else{
                        swal(res.error_message, {
                            timer: 2000,
                        });
                    }

                })
            }catch(err){
                console.log(err)
            }



        }else{
            swal("คุณยังไม่ได้ทำการเข้าสู่ระบบ กรุณาเข้าสู่ระบบ", {
                buttons: {cancel:"ยกเลิก", register:"เข้าสู่ระบบ"},
            }).then((value) => {
                switch (value) {

                    case "register":
                        this.setState({redirect:true})
                        break;

                }
            });

        }



    }


    render() {

        if (this.state.redirect) {
            return <Redirect push to="/login" />;
        }
        const {point , name , last_name ,land_id,area,price,detail,land_image} = this.props.element
        return (
            <div style={{width:900}} >
                <div >
                    <div style={{display:"flex",justifyContent:"center"}}>
                    <div className="map_style"  style={{backgroundImage:`url(${ip+land_image})`}}  >
                        <svg id="myDIV" height="1024" width="768">
                            <polygon  points={this.build_polygon(JSON.parse(point))} style={{fill:this.props.element.fill,opacity:0.5 }} />
                        </svg>
                    </div>
                    </div>
                    <div style={{ fontSize:30,marginRight:100,marginLeft:100}}>
                        <div style={{ fontWeight:"bolder",fontSize:35}}>
                            ข้อมูลพื้นที่
                        </div>


                        <div style={{ marginLeft:50}}>
                            ชื่อ : {name} <br/>
                            นามสกุล : {last_name} <br/>
                            เนื้อที่ทั้งหมด : {area} ตารางเมตร<br/>
                            {/*ให้ผลผลิต : 600 กก./ไร่<br/>*/}
                            ราคา : {(area/1600)*price} บาท/รอบการเพราะปลูก<br/>
                        </div>



                        <div style={{ fontWeight:"bolder",fontSize:35}}>
                            รายละเอียดพื้นที่
                        </div>
                        <div style={{ marginLeft:50}}>
                            <p  style={{textIndent:50}}>{detail}</p>
                        </div>

                        <div style={{ marginLeft:50 ,display:"flex",flexDirection:"row",justifyContent:"center"}}>
                            <button type="button" style={{marginRight:50}} className="default_button" onClick={()=>{this.onsubmit(land_id)}}>เช่าที่นา</button>
                            <button type="button"  style={{marginLeft:50}}  className="cancle_button" onClick={()=>{this.props.onCloseModal()}}>ยกเลิก</button>
                        </div>




                    </div>

                </div>
            </div>
        );
    }
}

export default RentModal;
