import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Pressable } from "react-native";
import { forgetPassword } from "../../firebase/auth"; 
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleForgetPassword = async () => {
    try {
      await forgetPassword(email);
      setSuccessMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError(error.message);
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
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'blue' : 'purple', 
          padding: 10,
          borderRadius: 50,
          alignItems: 'center',
          marginLeft:10,
          marginRight:10,
        },
        styles.button
      ]}
      onPress={handleForgetPassword}
    >
      <Text style={{ color: 'white', textAlign: 'center' }}>Reset Password</Text>
    </Pressable>
    {error ? <Text style={styles.error}>{error}</Text> : null}
    {successMessage ? (
      <Text style={styles.success}>{successMessage}</Text>
    ) : null}
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
  error: {
    color: "red",
    marginTop: 10,
    fontSize:16,
    marginLeft:15,
  },
  
  success: {
    color: "green",
    marginTop: 10,
  },
});

export default ForgetPassword;
