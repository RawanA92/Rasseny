import React, { useState } from "react";
import { View, TextInput, Button, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { register } from "../../firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePress = async () => {
    try {
      const credentials = await register(email, password);
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
  onPress={handlePress}
>
  <Text style={{ color: 'white', textAlign: 'center' }}>Register</Text>
</Pressable>
      <Pressable style={styles.logindButton}

       onPress={() => router.replace("/account/login")}>
        <Text style={styles.link}>Login</Text>
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

  }, logindButton:{
    alignItems:"center",
    alignContent:"center",
    borderColor:"white",
   
    
  },
  link: {
    marginTop: 10,
    fontSize: 18,
    fontWeight:"bold",
 color:"white", 
  },
  error: {
    color: "red",
    marginTop: 10,
    fontSize:17,
  },
});

export default Register;
