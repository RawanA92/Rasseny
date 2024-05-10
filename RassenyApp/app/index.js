import React from "react";
import { View, Text, StyleSheet , Pressable} from "react-native";
import { Link } from 'expo-router'; 
import IntroScreen from "./IntroScreen";
export default function Page() { 
  return (
    <View style={styles.container}>
    <IntroScreen/>
    <Link href='/account/login' asChild>
      <Pressable style={styles.start}>
        <Text>Start</Text>
      </Pressable>
    </Link>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  start : {
    backgroundColor : 'black' ,
    borderRadius:40 ,
    width : 120,
    height:50,
margin:100    
  },
});
