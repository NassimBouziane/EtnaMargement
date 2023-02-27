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
    //TODO ADD RETARD IF STUDENTS ARRIVES BETWEEN 10h AND 14H
    
    if(Number(hours) > 12){

        if(isAlready[0].afternoon == 'Present'){
            console.log(isAlready[0].afternoon)
        }
        else{
            updatelogs({afternoon : "Present"}, isAlready[0].id)
        }
    }
    else{
        
        if(isAlready[0].morning == 'Present'){
            //ALERT por dire que vous etes déja emargé
            console.log(isAlready[0].morning)
        }
        else{
            updatelogs({morning : "Present"}, isAlready[0].id)
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
    return await api.put('/logs/update/'+id,{body}).then((response) =>console.log(response.data))
}

export const getLogsByDate = async(date: String) =>{
    return await api.get('/logs/date/'+date).then((response) => response)
}
