import moment from 'moment-timezone'
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
    //TODO ADD RETARD IF STUDENTS ARRIVES BETWEEN 10h AND 14H
    
    if(Number(hours) > 12){

        if(isAlready[0].afternoon == 'Present'){
            console.log(isAlready[0].afternoon)
        }
        else{
            updatelogs({afternoon : "Present", hours_afternoon:hours_minute, status:null}, isAlready[0].id)
        }
    }
    else{
        
        if(isAlready[0].morning == 'Present'){
            //ALERT por dire que vous etes déja emargé
            console.log(isAlready[0].morning)
        }
        else{
            updatelogs({morning : "Present", hours_morning:hours_minute, status:null}, isAlready[0].id)
        }
    }
    }
    else{

        return await api.post('/logs',{
            login:login,
            date:date,

        }).then((response)=> {checkLogs(login,date)})
    } 
}

export const updatelogs = async(body:any,id: Number)=>{
    return await api.put('/logs/update/'+id,{body}).then((response) => response)
}

export const getLogsByDate = async(date: String) =>{
    // THIS GETS STATS
    return await api.get('/logs/date/'+date).then((response) => response)
}

export const getLogsByToday = async(date: String) =>{
    // THIS GETS STATS
    return await api.get('/logs/today/'+date).then((response) => response)
}