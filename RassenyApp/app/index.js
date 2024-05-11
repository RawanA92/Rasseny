import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from 'expo-router';
import IntroScreen from "./IntroScreen";

export default function Page() {
  return (
    <View style={styles.container}>
      <Link href='/account/login' asChild>
        <Pressable style={styles.start} onPress={() => console.log("Pressed!")}>
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>
      </Link>
      <IntroScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  start: {
    backgroundColor: 'blue',
    borderRadius: 40,
    width: 120,
    height: 50,
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 3, 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
