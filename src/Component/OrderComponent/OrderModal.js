import React, { Component } from 'react';

import swal from 'sweetalert';

import { Redirect } from 'react-router';
import {Button} from 'bloomer';
import { ip,post } from '../../Service/Service'
class OrderModal extends Component {

    constructor(){
        super()
        this.state={
            isActive:false,
            redirect:false,
            imagePreviewUrl:null,
            file:null


        }
    }
    // build_polygon = (data) => {
    //     let points = ""
    //     if(data){
    //         data.map((element,index)=>{
    //             points = points+`${element.x},${element.y} `
    //         })
    //     }
    //     return points
    // }
    uploadpicture = (e) => {

        // console.log(e);
        // var encoded = base64.encode();
        // alert(e[0]);
        // e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        //console.log(e.target.files[0]);
        if(!file){

        }else{
            reader.readAsDataURL(file)
            reader.onloadend = () => {

                // console.log( reader.result)

                this.setState({
                    imagePreviewUrl: reader.result
                });
            }
        }

    }
    comfirm_payment = async () => {
        const object = {
            order_id : this.props.element.order_id,
            payment_image :  this.state.imagePreviewUrl
        }

        try{
            await post(object,'order/user_confirm_payment',sessionStorage.getItem('user_token')).then((res)=>{
                if(res.success){
                    swal(res.message, {
                        icon: "success",
                        buttons: false,
                        timer: 2000,
                    });
                    setTimeout(()=>{window.location.reload()},2000)

                }else{
                    console.log(res.error_message)
                }
            })

        }catch(err){
            console.log(err)
        }
    }


    render() {



        if (this.state.redirect) {
            return <Redirect push to="/login" />;
        }
        const {point , name ,payment_image, last_name,payment_status ,land_id,area,price,detail,land_image} = this.props.element
        return (
            <div style={{width:900}} >
                <div >
                    <div style={{ fontSize:30,marginRight:100,marginLeft:100}}>
                        <div style={{ fontWeight:"bolder",fontSize:35}}>
                            ข้อมูลพื้นที่
                        </div>


                        <div style={{ marginLeft:50}}>
                            {/*ชื่อ : {name} <br/>*/}
                            {/*นามสกุล : {last_name} <br/>*/}
                            เนื้อที่ทั้งหมด : {area} ตารางเมตร<br/>
                            {/*ให้ผลผลิต : 600 กก./ไร่<br/>*/}
                            ราคา : {(area/1600)*price} บาท/รอบการเพราะปลูก<br/>
                            สถานะการชำระเงิน : {
                            payment_status === 0? "รอส่งเอกสารยืนยัน":
                                payment_status === 1 ? "รอยืนยันการชำระเงิน" :
                                    "ชำระเงินเรียบร้อยแล้ว"
                        }
                        </div>
                        {payment_status === 0?
                        <div style={{ marginLeft:50}}>
                            <input onChange={(event)=>this.uploadpicture(event)} type="file"/>
                        </div>
                            :null}
                        <div>
                            <img style={{width:200,height:300}} src={payment_image !== ""? ip+payment_image:this.state.imagePreviewUrl}/>
                        </div>





                        <div style={{ marginLeft:50 ,display:"flex",flexDirection:"row",justifyContent:"center"}}>
                            {payment_status === 0?<button type="button" style={{marginRight:50}} className="default_button" onClick={()=>{this.comfirm_payment()}}>ยืนยันการสั่งซื์้อ</button>:null}
                            <button type="button"  style={{marginLeft:50}}  className="cancle_button" onClick={()=>{this.props.onCloseModal()}}>ยกเลิก</button>
                        </div>




                    </div>

                </div>
            </div>
        );
    }
}

export default OrderModal;
