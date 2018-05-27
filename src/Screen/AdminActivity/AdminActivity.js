import React, { Component } from 'react';
import { get,post } from '../../Service/Service'
import {
    brand,
    Container,
    Content,Table,Column,Footer ,Icon} from 'bloomer';
import swal from 'sweetalert'
import { Redirect } from 'react-router-dom'
import Modal from 'react-responsive-modal';
import OrderModal from "../../Component/OrderComponent/OrderModal";
import AdminModal from "../../Component/AdminComponent/AdminModal";
var jwtDecode = require('jwt-decode')
class AdminActivity extends Component {

    constructor(){
        super()
        this.state={
            isActive:false,
            order_data:[],
            element:null,
            modalisopen:false
        }
    }

    onClickNav = () => {
        this.setState({
            isActive:!this.state.isActive
        })
    }
    get_order_admin = async () => {
        try{
            await  get('order/get_land_order_admin',sessionStorage.getItem('user_token')).then((res)=>{
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



    show_dialog = (element) => {
        this.setState({element})
        setTimeout(()=>{
            this.onOpenModal()
        },20)

    }

    onOpenModal = () => {
        this.setState({ modalisopen: true });
    };

    onCloseModal = () => {
        this.setState({ modalisopen: false });
    };

    componentDidMount = () => {
        this.get_order_admin()
    }
    render() {


        if(sessionStorage.getItem("user_token") !== null){
            if(jwtDecode(sessionStorage.getItem("user_token")).type <= 0){
                return <Redirect push to="/" />;
            }
        }else{
            return <Redirect push to="/" />;
        }

        let ModalProps = {
            element: {...this.state.element,
                name:this.state.name,
                last_name:this.state.last_name,
                land_image:this.props.location.params?this.props.location.params.land_image:null},
            onCloseModal:()=>this.onCloseModal(),
            modalisopen:this.state.modalisopen

        }
        return (
            <div >

                <div style={{display:"flex",marginTop:50,justifyContent:"center"}}>
                    <div style={{width: "80%",borderRadius:5,display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"center"}}>

                        <div style={{fontSize:30,marginTop:10,fontWeight:"bold"}}>
                            ยืนยันการชำระเงิน
                        </div>
                        <div style={{width:"70%",display:"flex",marginTop:20,flexDirection:"column",alignItems:"center"}}>

                            <Table isBordered isStriped isNarrow>
                                <thead>
                                <tr>
                                    <th>เลขการสั่งซื้อ</th>
                                    <th>สถานะการจ่ายเงิน</th>
                                    <th>อัพโหลดสลิป</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.order_data.map((element,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{element.order_id}</td>

                                            <td>{element.payment_status === 0?
                                                <div style={{color:"#ff594b"}}>รอส่งเอกสารยืนยัน</div>:
                                                element.payment_status === 1?
                                                <div style={{color:"#70ff69"}}>รอยืนยันการจ่ายเงิน</div>:
                                                    element.payment_status === 2?
                                                        <div style={{color:"#6465ff"}}>ชำระเงินเรียบร้อยแล้ว</div>:null
                                        }</td>
                                            <td><button onClick={()=>{this.show_dialog(element)}}>ยืนยันการชำระเงิน</button></td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>

                <Modal styles={{backgroundColor:"#fbffd8", width:900}} open={this.state.modalisopen} onClose={()=>this.onCloseModal()} >
                    <AdminModal {...ModalProps}/>
                </Modal>

            </div>
        );
    }
}

export default AdminActivity;