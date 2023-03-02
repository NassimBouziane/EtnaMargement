import React from "react";
import QRCode from "react-native-qrcode-svg";

export function QRCODE (props:any){
    return(
        <QRCode
        value={props.value}
        size={props.size ? props.size : 70}
        color="black"
        backgroundColor="#E3E3E3"
        />
        )
    }

export default QRCODE
