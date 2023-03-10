import moment from 'moment-timezone'
import { useState } from 'react'
import { Alert } from 'react-native'
import { api } from '../ServiceHelper'

interface log{
    afternoon: String,
    date: String,
    id:Number,
    login:String,
    morning:String

}

export const checkLogs = async(login :String, date:any) => {

    const isAlready : Array<log> = await api.get(`/logs/date/${date}/${login}`).then((response) => {return response.data})
    if(isAlready[0] != undefined ){
    const hours = moment().tz('Europe/Paris').format("HH")
    const hours_minute = moment().tz('Europe/Paris').format("HH:mm")
    const isBefore930 = moment(hours_minute, "HH:mm").isBefore(moment("09:30", "HH:mm"));
    const isBefore1650 = moment(hours_minute, "HH:mm").isBefore(moment("16:50", "HH:mm"));
    if(Number(hours) > 12){
        if(isBefore1650){
            if(isAlready[0].afternoon == 'Present' || isAlready[0].afternoon == 'Retard'){          
                console.log(isAlready[0].afternoon)
            }
            else{
                updatelogs({afternoon : "Retard", hours_afternoon:hours_minute, status:"Non Justifié"}, isAlready[0].id)            }

        }
        else{

        if(isAlready[0].afternoon == 'Present' || isAlready[0].afternoon == 'Retard'){
            console.log(isAlready[0].afternoon)
        }
        else{
            updatelogs({afternoon : "Present", hours_afternoon:hours_minute, status:""}, isAlready[0].id)
        }}
    }
    else if(Number(hours) < 12){
        if(!isBefore930){
            
            if(isAlready[0].morning == 'Present' || isAlready[0].morning == 'Retard'){
                console.log(isAlready[0].morning)
            }
            else{
                updatelogs({morning : "Retard", hours_morning:hours_minute, status:"Non Justifié"}, isAlready[0].id)}
        }
        else{
        
        if(isAlready[0].morning == 'Present' || isAlready[0].morning == 'Retard'){
            console.log(isAlready[0].morning)
        }
        else{
            updatelogs({morning : "Present", hours_morning:hours_minute, status:""}, isAlready[0].id)
        }}
    }
    }
    else{
        StartEmargement().then(() => {
            checkLogs(login,date)
        })    
    } 
}
export const StartEmargement = async()=>{
    return await api.post('/logs/insert').then((response) => response).catch((e) => console.log(e))
}
export const updatelogs = async(body:any,id: Number)=>{
    return await api.put('/logs/update/'+id,{body}).then((response) => response)
}

export const getLogsByDate = async(date: String) =>{
    return await api.get('/logs/date/'+date).then((response) => response)
}

export const getLogsByToday = async(date: String) =>{
    return await api.get('/logs/today/'+date).then((response) => response)
}

export const getLogsByLogin = async(login : String) =>{
    return await api.get('/logs/stats/'+login).then((response) => response)
}

export const getLogsUser = async(login:String) =>{
    return await api.get('/logs/'+login).then((response)=>response.data).catch((e)=>console.log("[FAIL]:",e))
}