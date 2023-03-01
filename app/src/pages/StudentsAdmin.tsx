import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Navbar from "../components/Navbar";
import { Ionicons } from "@expo/vector-icons";
import CardStudent from "../components/CardStudent";
import { getLogsByToday } from "../../services/logs/logs.services";
import { fetchUserConnected, getUserByLogin } from "../../services/users/users.services";
interface Logs{
  id: any,
  login:String,
  date:String,
  morning:String,
  afternoon:String,
  status:String,
  hours_morning:String,
  hours_afternoon:String
  firstname:String,
  lastname:String
}



export default function StudentsAdmin() {
  const [dataDay, setDataDay] = useState<any>()
  const [searchValue, setSearchValue] = useState("");
  const [absentFilter, setAbsentFilter] = useState(false); 
  const [retardFilter, setRetardFilter] = useState(false);
  const [presentFilter, setPresentFilter] = useState(false);


  const handleclick = (button: string) => {
    setPresentFilter(button === "Present");
    setAbsentFilter(button === "Absent");
    setRetardFilter(button === "Retard");
  }

  const getByDate = async() => {
    const today = new Date().toISOString().substring(0,10);
    await getLogsByToday(today).then((response) => setDataDay(response.data))
    
  }
  useEffect(() => {

    getByDate()
  },[])
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Mettre à jour le state isLoading pour simuler une durée de chargement
    setTimeout(() => {
      setLoading(false);
    }, 100); // Temps de chargement de 3 secondes
  }, []);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log(`Recherche: ${searchText}`);
    // implémenter la logique de la recherche
  };
  const getUserInfo = async(login: String) =>{
    const token: any = await AsyncStorage.getItem("token");
    const user = await getUserByLogin(login, await JSON.parse(token));
    return user

    //firstname={user.firstname ? user.firstname : ""} lastname={user.lastname ? user.lastname : ""}

  }
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" className="mt-64" />
      ) : (
        <View className="flex flex-row h-full w-full ">
          <Navbar />
          <View>
            <View className="ml-5">
              <View className="flex-row w-[280px] items-center bg-gray-200 px-3 py-3 rounded-xl mt-5 mb-3">
                <Ionicons
                  name="search-outline"
                  size={24}
                  className="text-gray-500"
                />
                <TextInput
                  className="flex-1 text-gray-700 ml-5"
                  placeholder="Rechercher par login"
                  onChangeText={(text) => setSearchValue(text)}                  onSubmitEditing={handleSearch}
                  value={searchValue}
                />
              </View>
              <View className="flex flex-row w-full gap-6 ">
                <View className="bg-[#92F866] px-4 py-2 rounded-xl">
                  <Pressable onPress={()=> handleclick("Present")}><Text className="text-lg">Prés.</Text></Pressable>
                </View>
                <View className="bg-[#FBB733] px-4 py-2 rounded-xl">
                <Pressable onPress={()=> handleclick("Retard")}><Text className="text-lg">Retard</Text></Pressable>
                </View>
                <View className="bg-[#F04C4C] px-4 py-2 rounded-xl">
                <Pressable onPress={()=> handleclick("Absent")}><Text className="text-lg">Abs.</Text></Pressable>
                </View>


              </View>
            </View>
            <ScrollView
              className=" h-full ml-5"
              showsVerticalScrollIndicator={false}
            >
              {/* <CardStudent
                fistname="Raphaël"
                lastname="Plassart"
                login="plassa_r"
              /> */}
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

              <CardStudent key={items.id} login={items.login} morning={items.morning} afternoon={items.afternoon} firstname={items.firstname} lastname={items.lastname}/> 
              
            ) 
               
          }) }
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}
