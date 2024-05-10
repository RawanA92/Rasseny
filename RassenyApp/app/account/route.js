import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const route = () => {
  const router = useRouter();
  const handleCreateAccount = () => {
    router.push("account/register");
  };

  const handleLogin = () => {
    router.push("account/login");
  };
 

 

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Rasseny</Text>

    
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: 'blue',
    marginBottom: 20,
  },
  
});

export default route;