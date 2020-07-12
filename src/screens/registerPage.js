
'use strict';

import React from 'react';
import {   StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableHighlight,
  AsyncStorage,
  ScrollView, } from 'react-native';
import { Container} from 'native-base'
import { toastr } from '../component/toastComponent'
import  ModalComponent  from '../component/modalComponent'
import { Spinner } from 'native-base'
const screenWidth = Math.round(Dimensions.get('window').width);


export default class RegisterPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            userName:'',
            confirmPassword:'',
            password:'',
            mailvalidate:false,
            modalVisible: false,
            loading:false,
        };
      
    }


    componentDidMount() {
    }

    toggleModal = () =>{
      this.setState({modalVisible:false})
      this.firstNameTxt.clear()
      this.lastNameTxt.clear()
      this.emailTxt.clear()
      this.userNameTxt.clear()
      this.passwordTxt.clear()
      this.confirmPasswordTxt.clear()
      this.props.navigation.navigate('Menu')
    }

    handleFirstName =(text) =>{
      this.setState({firstName:text})
    }

    handleLastName =(text)=>{
      this.setState({lastName:text})
    }

    handleEmail=(text)=>{
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

    emailVaidate =() =>{
      if(!this.state.mailvalidate)
        toastr.showToast('Invalidating Email',2500)
    }

    handleUsername = (text) => {
      this.setState({ userName: text })
    }

    handlePassword = (text) =>{
      this.setState({password:text})
    }

    handleConfirmPassword = (text) =>{
      this.setState({confirmPassword:text})
    }

    handleRegister =() =>{
      // this.props.navigation.navigate('Profile')
      const{ firstName,lastName,email,userName,password,confirmPassword} = this.state
      if(!firstName || !lastName || !email || !userName || !password || !confirmPassword){
        toastr.showToast("Please enter the all informations",3500)
      }else{
        if(password.length < 6)
        {
          toastr.showToast("password length is bigger than 6 lenghts");
        } else{
          if(password !== confirmPassword){
            toastr.showToast("password is not equal with the resetpassword",3000)
          }else{
            this.setState({loading:true})
            fetch('http://dopplle.net/Api/reg', {
            //  fetch('http://192.168.207.11/backendCI/Api/reg', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:'firstname'+'='+firstName+'&'+ 'lastname'+'='+lastName+'&'+ 'email'+'='+ email+'&'+ 'username'+'='+ userName+'&'+ 'password'+'='+ password+'&'+ 'photourl'+'='+ ""+'&'+ 'google'+'='+ "no"
              }).then((response) => response.json())
                    .then((responseJson) => {
                      if(responseJson[1].message =='Register Successfully'){
                       
                        AsyncStorage.setItem('userId',responseJson[0].user );
                        this.setState({loading:false})
                        this.setState({modalVisible:true})
                     
                      } else if(responseJson[1].message =='mail exists,Please try again')
                      {
                        toastr.showToast(responseJson[1].message,3500)
                        this.setState({loading:false})
                      }else if(responseJson[1].message =='User name exists,Please try again')
                      {
                        toastr.showToast(responseJson[1].message,3500)
                        this.setState({loading:false})
                      }
                      console.log(responseJson[0].user)
                      this.setState({loading:false})
             
                    })
                    .catch((error) => {
                      console.log(error);
              });
          }
        }
       
      }




    
    }

  
    handleGoLogin=()=>{
      this.props.navigation.navigate('Home')
    }

    render() {
      const { loading } = this.state
      return (
               <Container >
                 <ScrollView >
                  <View style={styles.container}>
                  {loading && (
                      <Spinner
                        style={{position:"absolute",top:150,zIndex:200,left:"48%"}}
                        color='#f26727' />
                   )}
                    <Image source={require('../Resources/logo.png')} style={styles.img}/>
                    <Text style={styles.welcomeTxt} >
                          Welcome to Dopplle
                    </Text>
                    <Text style={styles.createLoginTxtInput} >
                          Create an account to see it in action
                    </Text>
                    <View  style={styles.inputBox}>
                      <TextInput
                        style={{fontSize:20}}
                        placeholder="First Name"
                        underlineColorAndroid = "transparent"
                        onChangeText = {this.handleFirstName}
                        ref={firstName => { this.firstNameTxt = firstName }}
                      >
                      </TextInput>
                    </View>
                    <View  style={styles.inputBox}>
                      <TextInput
                        style={{fontSize:20}}
                        placeholder="Last Name"
                        underlineColorAndroid = "transparent"
                        onChangeText = {this.handleLastName}
                        ref={lastName => { this.lastNameTxt = lastName }}
                      >
                      </TextInput>
                    </View>
                    <View  style={styles.inputBox}>
                      <TextInput
                        style={{fontSize:20}}
                        placeholder="Email"
                        underlineColorAndroid = "transparent"
                        onChangeText = {this.handleEmail}
                        onBlur = {this.emailVaidate}
                        ref={email => { this.emailTxt = email }}
                      >
                      </TextInput>
                    </View>
                    <View  style={styles.inputBox}>
                      <TextInput
                        style={{fontSize:20}}
                        placeholder="UserName"
                        underlineColorAndroid = "transparent"
                        onChangeText = {this.handleUsername}
                        ref={userName => { this.userNameTxt = userName }}
                      >
                      </TextInput>
                    </View>
                    <View  style={styles.inputBox}>
                      <TextInput
                          style={{fontSize:20}}
                          placeholder="Password"
                          underlineColorAndroid = "transparent"
                          textContentType="password"
                          secureTextEntry={true}
                          onChangeText = {this.handlePassword}
                          ref={password => { this.passwordTxt = password }}
                      >
                      </TextInput>
                    </View>
                    <View  style={styles.inputBox}>
                      <TextInput
                          style={{fontSize:20}}
                          placeholder="Confirm Password"
                          underlineColorAndroid = "transparent"
                          textContentType="password"
                          secureTextEntry={true}
                          onChangeText = {this.handleConfirmPassword}
                          ref={confirmPassword => { this.confirmPasswordTxt = confirmPassword }}
                      >
                      </TextInput>
                    </View>
                    <TouchableHighlight 
                          style={styles.loginButton}
                          onPress={this.handleRegister}
                        >
                        <Text style={styles.loginTxt}>
                            Register
                        </Text>
                    </TouchableHighlight>

                    <Text 
                      style={styles.forgotTxtInput} 
                      onPress={this.handleGoLogin}
                    >
                        Back to Login
                    </Text>
                    <ModalComponent visible ={this.state.modalVisible} toggleModal={this.toggleModal}  txt="Contratulations! Register was succssfully"/>
                  </View>
                </ScrollView>            
              </Container>
        
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
          textAlign:"center"
        },
        inputBox:{
          width:screenWidth/1.3,
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
          width:screenWidth/1.3,
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
          marginTop:8,
          marginBottom:8
        },
        forgotTxtInput:{
          fontSize:18,
          color:"#6397c5",
          textAlign:"center",
          marginTop:15,
          marginBottom:15,
        }

    });

    // export const toastr = {
    //   showToast: (message, duration = 3500) => {
    //     Toast.show({
    //       text: message,
    //       duration,
    //       position: 'bottom',
    //       textStyle: { textAlign: 'center' },
    //       buttonText: "Okay",
    //       buttonTextStyle: { color: "#008000" },
    //       buttonStyle: { backgroundColor: "#5cb85c" },
    //       type: "danger"
    //     });
    //   },
    // };