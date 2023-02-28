import React from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export function QRCODE (props:any){
    return(
        <QRCode
        value={props.value}
        size={100}
        color="pink"
        backgroundColor="green"
        />
        )
    }

export default QRCODE
