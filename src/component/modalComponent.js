import React from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableHighlight, 
 } from 'react-native';

 export default class ModalComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
        };
      
    }
    render() {
      
        return (
            <View>
                <Modal animationType = {"slide"} transparent = {true}
                    visible = {this.props.visible}
                    onRequestClose = {() => { console.log("Modal has been closed.") } }>
            
                    <View style = {styles.container}>
                        <Image source={require('../Resources/check1.png')} style={styles.succssImg}/>
                        <Text style = {styles.succssTxt}>Success!</Text>
                        <Text style = {styles.normalTxt}>{this.props.txt}</Text>
                        <TouchableHighlight onPress = {this.props.toggleModal}
                            style={styles.OKbtn}  
                        >
                        
                        <Text style = {styles.OKTxt}>OK</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
        )
    }

}

const styles = StyleSheet.create({
        container:{
            width:"80%",
            height:300,
            backgroundColor:"#e2e2e2",
            marginTop:100,
            justifyContent:"center",
            alignItems:"center",
            marginLeft:"10%",
            borderRadius:20
        },
        succssImg:{
            width:80,
            height:80
        },
        succssTxt:{
            color:"#797c7e",
            fontSize:30
        },
        normalTxt:{
            color:"#797c7e",
            fontSize:20,
            marginTop:10, 
            textAlign:"center",
        },

        OKbtn:{
            width:70,
            height:40,
            backgroundColor:"#1392db",
            justifyContent:"center",
            alignItems:"center",
            marginTop:20,
            borderRadius:5
        },
        OKTxt:{
            color:"#fff",
            textAlign:"center"
        },


})

