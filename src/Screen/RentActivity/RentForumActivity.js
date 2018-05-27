import React, { Component } from 'react';
import './RentActivity.css'
import logo from '../../assets/image/Rent/Rent_logo.png'
import {Columns,Column} from 'bloomer';
import Modal from 'react-responsive-modal';
import { post ,ip} from '../../Service/Service'

// import Polygon from 'react-polygon'

// add this to your components
import {
    Redirect
} from 'react-router-dom'
import RentModal from "../../Component/RentComponent/RentModal";
class RentForumActivity extends Component {

    constructor() {
        super()
        this.state = {
            isActive: false,
            x: 0,
            y: 0,
            layout_x: 200,
            layout_y: 200,
            st_x: 0,
            st_y: 0,
            st_layout_x: 0,
            st_layout_y: 0,
            edit: 0,
            add_point: [],
            edit_status:0,
            modalisopen: false,
            element:"",
            name:null,
            last_name:null,
            land_data:[]

        }
    }

    taggingmouse(e){

        //var x = e.pageX;
        // var y = e.pageY;
        var elmnt = document.getElementById("myDIV");
        // var x = elmnt.scrollLeft;
        // var y = elmnt.scrollTop;
        var x = e.pageX  + elmnt.scrollLeft;
        var y = e.pageY  + elmnt.scrollTop;
        this.setState({ x : x,
            y : y});


        if(this.state.edit_status === 1){
            var min_x = this.state.x - this.state.st_x;
            var min_y = this.state.y - this.state.st_y;
            this.setState({ layout_x : this.state.st_layout_x + (min_x),
                layout_y : this.state.st_layout_y + (min_y)});
        }

    }
    tranfrom(x,y){
        return "translate("+x+","+y+")";
    }

    setdata(id) {

        // this.setState({
        //
        //     layout_x: 0,
        //     layout_y: 0,
        // })

        setTimeout(() => {this.setState({   edit_status:1,
            st_x:this.state.x,
            st_y:this.state.y,
            st_layout_x:this.state.layout_x,
            st_layout_y:this.state.layout_y});},20);
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

    add_point = () => {
        if(this.state.edit_status===1){
            let point_arr = this.state.add_point
            point_arr.push({x: this.state.layout_x, y: this.state.layout_y})
            this.setState({
                add_point:point_arr
            })

            console.log(point_arr)
        }

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
        if(this.props.location.params){
            const object = {
                user_id : this.props.location.params.user_id
            }
            try{
                await post(object,'user/get_user',null).then((res)=>{
                    if(res.success){
                        this.setState({
                            name:res.result.name,
                            last_name:res.result.last_name
                        })
                    }else{
                        console.log(res.error_message)
                    }
                })
            }catch(err){
                console.log(err)
            }
        }
    }

    get_land = async () => {
        if(this.props.location.params){

            const object = {
                announce_id : this.props.location.params.announce_id
            }
            try{
                await post(object,'land/get_land_information',null).then((res)=>{
                    console.log(res)
                    if(res.success){
                        this.setState({
                            land_data:res.result
                        })
                    }else{
                        console.log(res.error_message)
                    }
                })
            }catch(err){
                console.log(err)
            }
        }
    }
    componentDidMount = () => {
        this.get_user()
        this.get_land()
    }
    render() {
        let ModalProps = {
            element: {...this.state.element,
                price:this.props.location.params?this.props.location.params.price:null,
                name:this.state.name,
                last_name:this.state.last_name,
                land_image:this.props.location.params?this.props.location.params.land_image:null},
            onCloseModal:()=>this.onCloseModal(),
            modalisopen:this.state.modalisopen

        }

        if(this.props.location.params === undefined){
            return <Redirect push to="/rent"/> ;
        }
        return (
            <div style={{paddingBottom:50 }} >
                {/*<h1 className="header_style">เช่าที่นา</h1>*/}
                <div style={{display:"flex",justifyContent:"center", alignItems:"center",textAlign:"center"}}>

                            <img className="avatar_img" src={ip+this.props.location.params.image} />

                        <Column style={{fontSize:25,fontWeight:"bold",textAlign:"left"}} isSize='1/3'>
                            ชื่อ : {this.state.name} <br/>
                            นามสกุล : {this.state.last_name} <br/>
                            เนื้อที่ทั้งหมด : 400 ไร่<br/>
                            ให้ผลผลิต : 600 กก./ไร่<br/>

                        </Column>
                    {/*<button onClick={()=>{*/}
                        {/*this.setState({add_point:[]})*/}
                    {/*}}>clear</button>*/}
                </div>
                {JSON.stringify(this.state.add_point)}


                <div className="rent_page" >


                    <div className="map_style"  style={{backgroundImage:`url(${ip+this.props.location.params.land_image})`}} onMouseMove={this.taggingmouse.bind(this)}  >
                        <svg  onClick={()=>{this.add_point()}} id="myDIV" height="1024" width="768">
                            {this.state.land_data.map((element,index)=>{
                                return <polygon key={index} onClick={()=>{ element.rent_user_id?null:this.show_dialog(element)}} points={this.build_polygon(JSON.parse(element.point))} style={{fill:element.fill,opacity:0.5 ,cursor: element.rent_user_id?"not-allowed":"pointer"}} />
                            })}


                            {/*{this.state.edit_status === 1 ?*/}

                                {/*<polygon points={this.build_polygon(this.state.add_point)} style={{fill:"#ff3640",opacity:0.5 }} />*/}


                                {/*: <g transform={this.tranfrom(this.state.layout_x,this.state.layout_y)} className="sensor_bg" onClick={()=>this.setdata()}>*/}
                                        {/*<rect rx="5" ry="5" fill="#ff3640" width="5"  height="5" strokeWidth="2"  stroke="#fff"/>*/}

                                    {/*</g> }*/}


                            {this.state.edit_status === 1 ? this.state.add_point.map((element,index)=>{
                                return <g key={index} transform={this.tranfrom(element.x,element.y)} className="sensor_bg" onClick={()=>this.setdata()}>
                                            <rect rx="5" ry="5" fill="#ff3640" width="5"  height="5" strokeWidth="2"  stroke="#fff"/>
                                        </g>
                            }) :null}


                        </svg>
                    </div>
                </div>
                <Modal styles={{backgroundColor:"#fbffd8", width:900}} open={this.state.modalisopen} onClose={()=>this.onCloseModal()} >
                    <RentModal {...ModalProps}/>
                </Modal>

            </div>
        );
    }
}




export default RentForumActivity;

const polygon_mockup = [
    {

        fill:"#7dbaff",
        point:[{"x":318,"y":44},{"x":314,"y":100},{"x":370,"y":113},{"x":375,"y":51}],
        area:17,
        detail:"พื้นที่ราบลุ่ม เหมาะแก่การปลูกข้าวห้อมนกยูง ซืึ่งเป็นข้าวดังของพะเยา สามารถเก็บเกี่ยวได้สามครั้งต่อปี มีคลองชลประทานไหลผ่านนา ",
        price:20000,
        rent:true
    },
    {
        fill:"#ff7869",
        point:[{"x":323,"y":16},{"x":318,"y":40},{"x":374,"y":53},{"x":369,"y":110},{"x":434,"y":129},{"x":443,"y":69},{"x":434,"y":64},{"x":438,"y":43}],
        area:22,
        price:30000,
        detail:"พื้นที่ราบลุ่ม เหมาะแก่การปลูกข้าวห้อมนกยูง ซืึ่งเป็นข้าวดังของพะเยา ",
        rent:false
    },
    {
        fill:"#8fff87",
        point:[{"x":316,"y":96},{"x":321,"y":160},{"x":491,"y":202},{"x":509,"y":175},{"x":516,"y":116},{"x":439,"y":93},{"x":435,"y":123}],
        area:50,
        price:400000,
        detail:"พื้นที่ราบลุ่ม เหมาะแก่การปลูกข้าวห้อมนกยูง ซืึ่งเป็นข้าวดังของพะเยา สามารถเก็บเกี่ยวได้สามครั้งต่อปี ",
        rent:false
    },
    {
        fill:"#66ffe7",
        point:[{"x":513,"y":113},{"x":436,"y":94},{"x":440,"y":65},{"x":432,"y":62},{"x":435,"y":39},{"x":467,"y":37},{"x":495,"y":70},{"x":518,"y":93}],
        area:10,
        price:10000,
        detail:"พื้นที่ราบลุ่ม เหมาะแก่การปลูกข้าวห้อมนกยูง ซืึ่งเป็นข้าวดังของพะเยา สามารถเก็บเกี่ยวได้สามครั้งต่อปี มีคลองชลประทานไหลผ่านนา fffasdfasdfasdfasdfasdf",
        rent:true
    }




]