import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import { getLogsByToday } from "../../services/logs/logs.services";

import Navbar from "../components/Navbar";
// Historique émargement : Get by date
// Get By différentes DATE et filtrer par absent ou retard (et pouvoir changer le status)
//Assiduité : Get By login

interface Logs{
  id: any,
  login:String,
  date:String,
  morning:String,
  afternoon:String,
  status:String,
  hours_morning:String,
  hours_afternoon:String
}



export default function LogsInfo() {
  const [dataDay, setDataDay] = useState<any>()
  const [searchValue, setSearchValue] = useState("");
  const [absentFilter, setAbsentFilter] = useState(false); 
  const [retardFilter, setRetardFilter] = useState(false);
  const [presentFilter, setPresentFilter] = useState(false);


const handleclick =(button: String)=>{
  switch(button){
    case "Present":
      setPresentFilter(!absentFilter);
      setAbsentFilter(false);
      setRetardFilter(false)
    break;
    case "Absent":
      setPresentFilter(false);
      setAbsentFilter(!absentFilter);
      setRetardFilter(false)
    break;
    case "Retard":
      setPresentFilter(false);
      setAbsentFilter(false);
      setRetardFilter(!absentFilter)
    break;
    default:
      break;
  }

}

  const getByDate = async() => {
    const today = new Date().toISOString().substring(0,10);
    await getLogsByToday(today).then((response) => setDataDay(response.data))
    
  }
  useEffect(() => {

    getByDate()
  },[])
  return (
    <View className="flex flex-row h-full">
      <Navbar/>
    <View className="flex flex-col h-full w-[80%]">
      
      <View className="flex flex-row mx-auto">
      <Button title={"Absent"} onPress={() => handleclick("Absent")}></Button><Button title={"Present"} onPress={() => handleclick("Present")}></Button>
      <Button title={"Retard"} onPress={() => handleclick("Retard")}></Button></View>
      
      <TextInput
  style={{ height: 40, borderColor: "red", borderWidth: 1 }}
  onChangeText={(text) => setSearchValue(text)}
  value={searchValue}
/>
      <ScrollView>
      {dataDay && dataDay.filter((item: Logs) => {
            if (absentFilter && (item.morning !== "Absent" && item.afternoon !== "Absent")) {
              return false;
            }
            if (retardFilter && (item.morning !== "Retard" && item.afternoon !== "Retard")) {
              return false;
            }
            if (presentFilter && (item.morning !== "Present" && item.afternoon !== "Present")) {
              return false;
            }
            return item.login.toLowerCase().includes(searchValue.toLowerCase());
          })
          .map((items:Logs, i:Number)=>{
            return(
              <View key={items.id}>
                <Text style={{fontSize: 10}}>{items.login}{items.morning}{items.hours_morning}{items.afternoon}{items.hours_afternoon}</Text> 
              </View>
            )        
          }) }
      </ScrollView>
    </View>
    </View>
  );  
}
