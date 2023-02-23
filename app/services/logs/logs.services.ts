import { api } from '../ServiceHelper'
import moment from 'moment-timezone';


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
    //const hours = moment().tz('Europe/Paris').format("HH")
    const hours = 11;
    //TODO ADD RETARD IF STUDENTS ARRIVES BETWEEN 10h AND 14H
    
    if(Number(hours) > 12){

        if(isAlready[0].afternoon){
            console.log(isAlready[0].afternoon)

        }
        else{
            //TODO UPDATE LOGS ET METTRE PRESEnt
   
            updatelogs({afternoon : "present"}, isAlready[0].id)
        
        }



    }
    else{
        
        if(isAlready[0].morning){
            //ALERT por dire que vous etes déja emargé
            console.log(isAlready[0].morning)

        }
        else{
            //TODO UPDATE LOGS ET METTRE EN PRESENT
            updatelogs({morning : "present"}, isAlready[0].id)

 
        }
    }
    }
    else{
        //TODO2 CREATE THE LOG OF THE DAY FOR THE USER
        return await api.post('/logs',{
            login:login,
            date:date,

        }).then((response)=> {checkLogs(login,date)})
    }

    

    
}

export const updatelogs = async(body:any,id: Number)=>{

    return await api.put('/logs/'+id,body).then((response) =>console.log(response.data))
}
