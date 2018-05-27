import React, { Component } from 'react';
import { get,post } from '../../Service/Service'
import InformationColumn from '../../Component/InformationComponent/InformationColumn'
import Modal from 'react-responsive-modal'
import InformationModal from '../../Component/InformationComponent/InformationModal'
import {
    brand,
    Container,
    Content,Table,Column,Footer ,Icon} from 'bloomer';
var jwtDecode = require("jwt-decode")


class InformationActivity extends Component {

    constructor(){
        super()
        this.state={
            isActive:false,
            land_data:[],
            user_data:null,
            modalisopen:false
        }
    }

    onClickNav = () => {
        this.setState({
            isActive:!this.state.isActive
        })
    }

    onOpenModal = () => {
        this.setState({ modalisopen: true });
    };

    onCloseModal = () => {
        this.setState({ modalisopen: false });
    };
    show_dialog = (element) => {
        this.setState({element})
        setTimeout(()=>{
            this.onOpenModal()
        },20)

    }
    get_user = async () => {
        const object = {
            user_id : jwtDecode(sessionStorage.getItem('user_token')).id
        }
        try{
            await  post(object,'user/get_user',sessionStorage.getItem('user_token')).then((res)=>{
                if(res.success){
                    this.setState({user_data:res.result})
                }else{
                    console.log(res.error_message)
                }
            })
        }catch(err){
            console.log(err)
        }
    }

    get_land = async () => {
        const object = {
            user_id : jwtDecode(sessionStorage.getItem('user_token')).id
        }
        try{
            await  get('land/get_land_user',sessionStorage.getItem('user_token')).then((res)=>{
                if(res.success){
                    console.log(res.result)
                    this.setState({land_data:res.result})
                }else{
                    console.log(res.error_message)
                }
            })
        }catch(err){
            console.log(err)
        }
    }

    componentDidMount = () => {
        this.get_user()
        this.get_land()
    }
    render() {
        let ModalProps = {
            element: {...this.state.element},
            onCloseModal:()=>this.onCloseModal(),
            modalisopen:this.state.modalisopen

        }
        return (
            <div >

                <div style={{display:"flex",marginTop:50,justifyContent:"center"}}>
                    <div style={{width: "80%",borderRadius:5,display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"center"}}>

                        <div style={{fontSize:30,marginTop:10,fontWeight:"bold"}}>
                            ข้อมูลส่วนตัว
                        </div>
                        { this.state.user_data ?
                            <div style={{marginLeft: 50}}>

                                ชื่อ : {this.state.user_data.name} <br/>
                                นามสกุล : {this.state.user_data.last_name} <br/>
                                ที่อยู่ : {this.state.user_data.address} <br/>
                                เบอร์โทรศัพท์ : {this.state.user_data.phone_number} <br/>

                            </div>
                        :null}

                        {/*{this.state.land_data.map((element,index)=>{*/}
                            {/*return <div key={index}>{element.name}</div>*/}
                        {/*})}*/}

                        <div className="rent_page" >
                            <div className="rent_column">
                                <div className="media_content" style={{marginBottom:100,width:"90%"}}>
                                    {
                                        this.state.land_data !== [] ?
                                            this.state.land_data.map((element,index)=>{
                                                return <div style={{width:"90%"}} onClick={()=>{this.show_dialog(element)}}>
                                                    <InformationColumn {...element}/>
                                                </div>
                                            })
                                            :null

                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Modal styles={{backgroundColor:"#fbffd8", width:900}} open={this.state.modalisopen} onClose={()=>this.onCloseModal()} >
                    <InformationModal {...ModalProps}/>
                </Modal>


            </div>
        );
    }
}

export default InformationActivity;