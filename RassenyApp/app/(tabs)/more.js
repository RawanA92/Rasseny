import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import BackButton from '../Components/BackButton'; // Import the BackButton component
export default function More (){
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  return(
  <View>
    <BackButton onPress={goBack} />
  <Text>more page</Text>
  </View>
)
}