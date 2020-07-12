
'use strict';

import React from 'react';
import {   StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  AsyncStorage,
  TouchableHighlight, } from 'react-native';
import { toastr } from '../component/toastComponent'
import  ModalComponent  from '../component/modalComponent'

const screenWidth = Math.round(Dimensions.get('window').width)

export default class ResetPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userId:"",
            password:'',
            cpassword:'',
            modalVisible: false,
            
        };
      
    }

   async componentDidMount()
    {
      var userId = await AsyncStorage.getItem('userId')
      console.log(userId)
      this.setState({userId:userId})
    }

    toggleModal = () =>{
      this.setState({modalVisible:false})
      this.cpasswordTxt.clear()
      this.passwordTxt.clear()
      this.props.navigation.navigate('Home')
    }

    handlepassword =(text)=>{
     
       this.setState({password:text})
    } 
    handleCpassword =(text)=>{
     
        this.setState({cpassword:text})
     } 

     handleChangePassword =() =>{
      const { userId,cpassword,password } = this.state
      if(password.length < 6)
      {
        toastr.showToast("password length is bigger than 6 lenghts");
       } else{
        if(password !== cpassword){
          toastr.showToast("password is not equal with the resetpassword",3000)
        } else{

            fetch('http://dopplle.net/Apiuser/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    
                },
                body:'userId'+'='+ userId+'&'+ 'password'+'='+password
                }).then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson)
                            if(responseJson == 1){
                              this.setState({modalVisible:true})
                            }       
                        })
                        .catch((error) => {
                        console.error(error);
            });
        } 
      }
          
     
    }

    handleGobackLogin=()=>{
      this.props.navigation.pop()
    }

    render() {
      const spinner = this.state.isLoading ?
                <ActivityIndicator size='large'/> : null;
      return (
       
                <View style={styles.container}>
                  
                  <Text style={styles.welcomeTxt} >
                        Reset your password
                  </Text>
                  <Text style={styles.createLoginTxtInput} >
                       Please enter your new password to change 
                  </Text>
                  <View  style={styles.inputBox}>
                    <TextInput
                      style={{fontSize:20}}
                      placeholder="New Password"
                      underlineColorAndroid = "transparent"
                      onChangeText = {this.handlepassword}

                      ref={password => { this.passwordTxt = password }}
                    >
                    </TextInput>
                  </View>
                  <View  style={styles.inputBox}>
                    <TextInput
                      style={{fontSize:20}}
                      placeholder="Conform New Password"
                      underlineColorAndroid = "transparent"
                      onChangeText = {this.handleCpassword}

                      ref={cpassword => { this.cpasswordTxt = cpassword }}
                    >
                    </TextInput>
                  </View>
                  <TouchableHighlight 
                        style={styles.loginButton}
                        onPress={this.handleChangePassword}
                      >
                      <Text style={styles.loginTxt}>
                          Change Password
                      </Text>
                  </TouchableHighlight>
                  
                  <Text 
                    style={styles.forgotTxtInput}
                    onPress ={this.handleGobackLogin}  
                  >
                        Back to Login
                  </Text>
                  <ModalComponent visible ={this.state.modalVisible} toggleModal={this.toggleModal}  txt="Congratulations! your passoword has now been reset. Plese login with new password"/>
            
                </View>
    
        
      );
    }
  }
  
  const styles = StyleSheet.create({

        container:{
          flex: 1,
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center"
        },
        img:{
          margin:20,
          width:180,
          height:120,
        },
        welcomeTxt:{
          fontSize:30,
          color:"#797c7e",
          textAlign:"center",
          fontWeight:'bold',
        },
        inputBox:{
          width:screenWidth/1.1,
          height:45,
          backgroundColor:"#fff",
          borderRadius:10,
          marginTop:20,
          paddingLeft:10,
          borderBottomColor:"#797c7e",
          borderBottomWidth:1
        
        },
      
        loginButton:{
          backgroundColor:"#f26727",
          width:screenWidth/1.1,
          borderRadius:6,
          height:50,
          justifyContent:"center",
          marginLeft:10,
          marginRight:10,
          marginTop:30,
        },
        loginTxt:{
          textAlign:"center",
          color:"#fff",
          fontSize:18,
        },
        createLoginTxtInput:{
          fontSize:18,
          color:"#797c7e",
          textAlign:"center",
          marginTop:25,
        },
        forgotTxtInput:{
          fontSize:18,
          color:"#6397c5",
          textAlign:"center",
          marginTop:25
        }

    });