import React, { Component } from 'react';
import {Columns,Column} from 'bloomer';
import { ip } from '../../Service/Service'
class InformationColumn extends Component {

    constructor(){
        super()
        this.state={
            isActive:false
        }
    }
    render() {
        return (
                <Columns style={{ marginTop:30,borderRadius:10 ,backgroundColor:"rgba(255, 253, 120,0.5)"}} >
                    <Column style={{ marginTop:20 }} isCentered isSize='1/3'>
                        <img style={{ borderRadius:50 , marginBottom:20, width:100,height:100}} src={ip+this.props.image} />
                    </Column>
                    <Column style={{ marginTop:20 }} isCentered isSize='2/3'>
                        xcvbxvcbxcvb xcvbxvcbxcvbxcvbxvcbxcvbxcvbxvcbxcvb xcvbxvcbxcvbxcvbxvcbxcvbxcvbxvcbxcvbxcvbxvcbxcvb xcvbxvcbxcvb
                        {this.props.detail}
                    </Column>
                </Columns>
        );
    }
}

export default InformationColumn;
