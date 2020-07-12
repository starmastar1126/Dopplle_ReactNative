
'use strict';

import React from 'react';
import {   StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
 } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export default class MenuPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            mailvalidate:false,
            modalVisible: false,
        };
      
    }

  handleGoProfile = () =>{
    this.props.navigation.navigate('Profile')
   
  }

  handleGoMeasurment = () =>{
    console.log("handleGoMeasurment")
  }

    render() {
      const spinner = this.state.isLoading ?
                <ActivityIndicator size='large'/> : null;
      return (
       
                <View style={styles.container}>
                  <Image source={require('../Resources/logo.png')} style={styles.img}/>
                  <View style={styles.subcontainer} >
                    <View style={styles.proMesurBox} >
                      <Image source={require('../Resources/profile1.png')} style={styles.subimg}/>
                      <Text 
                        style={styles.proMeasureTxt}
                        onPress={this.handleGoProfile}
                      >
                        Setting the Profile
                      </Text>
                    </View>

                    <View style={styles.proMesurBox} >
                      <Image source={require('../Resources/measure.png')} style={styles.subimg}/>
                      <Text 
                        style={styles.proMeasureTxt}
                        onPress={this.handleGoMeasurment}
                      >
                          Measurement Unit
                      </Text>
                    </View>
                  </View>    
                  
                </View>
    
        
      );
    }
  }
  
  const styles = StyleSheet.create({

        container:{
          flex: 1,
          flexDirection:"column",
          // justifyContent:"center",
          alignItems:"center"
        },
        img:{
          marginTop:120,
          width:180,
          height:120,
        },
        subcontainer:{
          flexDirection:"row",
          justifyContent:"space-between"
        },
        proMesurBox:{
          width:110,
          height:110,
          backgroundColor:"#f90",
          alignItems:"center",
          borderRadius:10,
          margin:20
        },
       subimg:{
         width:60,
         height:60,
         marginTop:6
        },
        proMeasureTxt:{
          color:"#fff",
          textAlign:"center"
        }

    });