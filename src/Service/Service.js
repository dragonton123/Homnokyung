import React, { Component } from 'react';

export const ip = "http://127.0.0.1:3012/api/v1/"
// export const ip = "http://103.253.72.69:3012/api/v1/"


export const post = (object,path,token) => new Promise((resolve, reject)=> {
    fetch(ip + path, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify(object)
    }).then(res => {
        setTimeout(() => null, 0);
        return res.json()
    }).then(json => {
        resolve(json);
    }).catch((err) => reject(err))

})




export const get = (path,token) =>  new Promise((resolve, reject) =>{
    fetch(ip + path, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        setTimeout(() => null, 0);
        return res.json()
    }).then(json => {
        resolve(json);
    }).catch((err) => reject(err))

})
