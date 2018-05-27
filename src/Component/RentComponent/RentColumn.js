import React, { Component } from 'react';
import {Columns,Column} from 'bloomer';
import { ip } from '../../Service/Service'
class RentColumn extends Component {

    constructor(){
        super()
        this.state={
            isActive:false
        }
    }
    render() {
        return (
                <Columns isCentered  >
                    <Column isCentered isSize='1/3'>
                        <img style={{margin:"auto",marginBottom:20, width:350,height:150}} src={ip+this.props.image} />
                    </Column>
                    <Column isCentered isSize='2/3'>
                        {this.props.detail}
                    </Column>
                </Columns>
        );
    }
}

export default RentColumn;
