import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons , Ionicons , Foundation ,FontAwesome } from '@expo/vector-icons';

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
          marginTop: -50 
        },
        
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: () => (
            <FontAwesome name="home" size={26} color="white"  />          ),
          tabBarLabel: 'home'
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          tabBarIcon: () => (
            <Ionicons name="search-sharp" size={26} color="white" />
          ),
          tabBarLabel: 'Search'
        }}
      />
      <Tabs.Screen
        name='cart'
        options={{
          tabBarIcon: () => (
            <Entypo name="shopping-cart" size={26} color="rgb(235, 229, 217)" />
          ),
          tabBarLabel: 'Cart'
        }}
      />
      <Tabs.Screen
        name='more'
        options={{
          tabBarIcon: () => (
            <Foundation name="indent-more" size={26} color="rgb(235, 229, 217)" />
          ),
          tabBarLabel: 'More'
        }}
      />
    </Tabs>
  );
}
