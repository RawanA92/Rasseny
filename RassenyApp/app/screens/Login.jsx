import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { login } from "../../firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const session = localStorage.getItem("session");
      if (session === "admin") {
        router.navigate(`/home1`);
      } else if (session === "user") {
        router.navigate(`/home`);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async () => {
    try {
      const credentials = await login(email, password);
      console.log("credentials", credentials);
      if (email.includes("@admin")) {
        localStorage.setItem("session", "admin");
        localStorage.setItem("email",email)
        localStorage.setItem("username",email.split("@")[0])
        router.navigate(`/home1`);
      } else {
        localStorage.setItem("session", "user");
        localStorage.setItem("email",email)
        localStorage.setItem("username",email.split("@")[0])
        router.navigate(`/home`);
      }
    } catch (error) {
      console.log("error", JSON.stringify(error));
      setError(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Pressable onPress={() => router.replace("/account/register")}>
        <Text style={{ marginTop: 10 }}>Register</Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/account/forgetPassword")}>
        <Text style={{ marginTop: 10 }}>Forgot Password</Text>
      </Pressable>
      <Text>{error.code}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 15,
  },
});

export default Login;
