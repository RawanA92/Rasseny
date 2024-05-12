import React from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import {  Foundation ,FontAwesome } from '@expo/vector-icons';

export default function _layout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00ffff',
        tabBarLabelStyle: {
          fontSize: 16
        },
        tabBarStyle: {
          textShadowColor: "#00ffff", 
         textShadowOffset: { width: 0, height: 0 },
           textShadowRadius: 9,
           borderColor: '#00ffff',
           borderWidth:5,
          backgroundColor: 'black',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: 'hidden',
          marginTop: -50, 
          height:'9%',
        },
        
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: () => (
            <FontAwesome name="home" size={40} color="white"  />          ),
          tabBarLabel: 'home'
        }}
      />
    
      <Tabs.Screen
        name='cart'
        options={{
          tabBarIcon: () => (
            <Entypo name="shopping-cart" size={40} color="rgb(235, 229, 217)" />
          ),
          tabBarLabel: 'Cart'
        }}
      />
      <Tabs.Screen
        name='more'
        options={{
          tabBarIcon: () => (
            <Foundation name="indent-more" size={40} color="rgb(235, 229, 217)" />
          ),
          tabBarLabel: 'More'
        }}
        
      />
    </Tabs>
  );

}
