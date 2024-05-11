import { router } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, Button, Text, Pressable, StyleSheet } from "react-native";
import { login } from "../../firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const credentials = await login(email, password);
      console.log('credentials', credentials);
      if (email.includes('@admin')) {
        router.navigate(`/home1`);
      } else {
        router.navigate(`/home`);
      }
    } catch (error) {
      console.log('error', JSON.stringify(error));
      setError(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Pressable
  style={({ pressed }) => [
    {
      backgroundColor: pressed ? 'blue' : 'purple', 
      padding: 10,
      borderRadius: 50,
      marginLeft:10,
      marginRight:10,
    },
    styles.button 
  ]}
  onPress={handleLogin}
>
  <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
</Pressable>
      <Pressable 
      style={styles.registerdButton}

      onPress={() => router.replace("/account/register")}>
        <Text style={styles.link}>Register</Text>
      </Pressable>
      <Pressable
      style={styles.forgotPasswordButton}
       onPress={() => router.replace("/account/forgetPassword")}>
        <Text style={styles.password}>Forgot Password?</Text>
      </Pressable>
      <Text style={[styles.error, { textAlign: 'center',marginTop:10,fontStyle:"italic" }]}>{error.code}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 25,
    backgroundColor:"pink",
    borderRadius:50
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    marginRight:10,
    marginLeft:10,
    backgroundColor:"white",
    borderColor:"pink",
    borderRadius:50
  },
  registerdButton:{
    alignItems:"center",
    alignContent:"center",
    
  },
  link: {
    fontSize: 18,
    fontWeight:"bold",
   color:"white",
   margin:20,
  },
  forgotPasswordButton: {
    alignItems: "center",
    justifyContent: "center",
    
  },
  password: {
    color: "white",
    fontSize: 16,
    fontWeight:"bold"
  },
  error: {
    color: "red",
    fontSize:17,
    alignContent:"center"
  },
});

export default Login;
