
'use strict';

import React from 'react';
import {   StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Dimensions,
  AsyncStorage,
  TouchableHighlight, } from 'react-native';
import { toastr } from '../component/toastComponent'
const screenWidth = Math.round(Dimensions.get('window').width);

export default class ForgotPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userId:"",
            email:'',
            mailvalidate:false,
            
        };
      
    }

   async componentDidMount()
    {
      var userId = await AsyncStorage.getItem('userId')
      console.log(userId)
      this.setState({userId:userId})
    }

    handleEmail = (text) => {
      this.setState({mailvalidate:false})
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
      if(reg.test(text) === false)
      {
        
        // this.setState({email:text})
        return false;
      }
      else {
        this.setState({email:text})
        this.setState({mailvalidate:true})
        
      }
    }

      handleSendEmail =() =>{
      const { userId,email,mailvalidate } = this.state
      if(!mailvalidate)
      {
        toastr.showToast('Invalidating Email formmating',2500)
      }else{
    
        fetch('http://dopplle.net/Api/register/'+ userId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            
          },
          body:'email'+'='+ email
          }).then((response) => response.json())
                .then((responseJson) => {
                  if(responseJson == "true"){
                     this.props.navigation.navigate('Reset')
                     this.emailTxt.clear()
                  }else{
                    toastr.showToast('Email is not correct,Try again',2500)
                  }          
                })
                .catch((error) => {
                  console.error(error);
          });
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
                        Forgot password
                  </Text>
                  <Text style={styles.createLoginTxtInput} >
                       Please enter your email address 
                  </Text>
                  <View  style={styles.inputBox}>
                    <TextInput
                      style={{fontSize:20}}
                      placeholder="Email address"
                      underlineColorAndroid = "transparent"
                      onChangeText = {this.handleEmail}

                      ref={email => { this.emailTxt = email }}
                    >
                    </TextInput>
                  </View>

                  <TouchableHighlight 
                        style={styles.loginButton}
                        onPress={this.handleSendEmail}
                      >
                      <Text style={styles.loginTxt}>
                          Send reset password email
                      </Text>
                  </TouchableHighlight>
                  
                  <Text 
                    style={styles.forgotTxtInput}
                    onPress ={this.handleGobackLogin}  
                  >
                        Back to Login
                  </Text>
                  
            
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