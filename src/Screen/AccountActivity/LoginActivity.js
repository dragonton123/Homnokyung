import React, { Component } from 'react';
import {Field,Label,Control,Input} from 'bloomer';
import {post} from '../../Service/Service'
import swal from 'sweetalert';
import { Redirect } from 'react-router';
class LoginActivity extends Component {

    constructor(){
        super()
        this.state={
            email:null,
            password:null

        }
    }

    enterPressed = (event) => {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            this.onLogin()
        }
    }

    onInput = (event) => {
        this.setState({ [event.target.name] : event.target.value})
    }

    onLogin = async () => {
        if(this.state.email && this.state.password){
            const object = {
                email:this.state.email,
                password:this.state.password
            }
            try{
                await post(object,"user/user_login",null).then((res)=>{
                    if(res.success){
                        sessionStorage.setItem('user_token', res.token)
                        window.location.href = '/'
                    }else{
                        swal(res.error_message, {
                            buttons: {cancel:"ตกลง"},
                        });
                    }
                })
            }catch(error){
                console.log(error)
            }
        }else {
            swal("กรุณากรอกข้อมูลให้ครบถ้วน", {
                buttons: {cancel:"ตกลง"},
            });
        }
    }

    onLogout =  () => {
        sessionStorage.removeItem('user_token')
    }



    render() {

            if (sessionStorage.getItem("user_token") !== null) {
                // window.location.href = '/'
                return <Redirect push to="/" />;
            }


        return (
            <div >
                <div style={{display:"flex",marginTop:50,justifyContent:"center"}}>
                    <div style={{width: 500,borderRadius:5, backgroundColor:"rgba(255, 253, 174,0.8)",display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"center"}}>

                        <div style={{fontSize:30,marginTop:50,fontWeight:"bold"}}>
                            เข้าสู่ระบบ
                        </div>
                        <div style={{width:"70%"}}>

                            <Field>
                                <div>Email</div>
                                <Control>

                                    <Input type="text" placeholder='test@email.com' name="email" onChange={(event)=>this.onInput(event)} />
                                </Control>
                            </Field>
                            <Field>
                                <div>Password</div>
                                <Control>
                                    <Input onKeyPress={this.enterPressed.bind(this)} name="password" onChange={(event)=>this.onInput(event)} type="password" placeholder='Password' />
                                </Control>
                            </Field>
                        </div>

                        <button type="submit"   className="default_button" style={{ marginTop:30, marginBottom:50,width:"60%"}} onClick={()=>{this.onLogin()}}>เข้าสู่ระบบ</button>

                    </div>
                </div>


            </div>
        );
    }
}

export default LoginActivity;
