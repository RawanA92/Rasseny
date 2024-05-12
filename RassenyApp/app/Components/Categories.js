import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import UserProfileScreen from "./UserProfileScreen";
import { router } from "expo-router";

const Categories = ({ categoryList }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => router.replace(`/productList?category=${item.title}`)}
    >
      <Image source={{ uri: item.imageURL }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.title}</Text>
    </TouchableOpacity>
  );

  const openProfileScreen = () => {
    setIsProfileOpen(true);
  };

  return (
    <View style={styles.container}>
    <Text style={styles.Ctitle} > Your Categories </Text>

      <FlatList
        data={categoryList}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={{ flex: 1 }}
      />
      {isProfileOpen && <UserProfileScreen onClose={() => setIsProfileOpen(false)} user={{ name: localStorage.getItem("username"), email: localStorage.getItem("email") }} />}
      <TouchableOpacity style={styles.profileButton} onPress={openProfileScreen}>
        <Text style={styles.profileButtonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: windowHeight * 0.03, 
    borderRadius:30,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  categoryItem: {
    marginHorizontal: windowWidth * 0.05, 
    marginBottom: windowHeight * 0.02, 
    borderRadius: windowWidth * 0.03, 
    alignItems: "center",
    width: (windowWidth - (windowWidth * 0.1)) / 2, 
    maxWidth: windowWidth * 0.4, 
  },
  
  
  categoryImage: {
    backgroundColor: 'white',
    shadowColor: "rgb(83,211,217)", 
    shadowOffset: { width:30, height: 50},
    shadowOpacity: 1, 
    shadowRadius: windowWidth * 0.1,
    width: '100%',
    height: windowHeight * 0.2, 
    borderRadius: windowWidth * 0.04, 
    marginBottom: windowHeight * 0.0, 
  },
  categoryName: {
    borderRadius:10, 
    fontSize: windowWidth * 0.05,
    textAlign: "center", 
    color: "white", 
    textShadowColor: "#00ffff", //shadow
    fontWeight:'850',

    textShadowOffset: { width: 1, height: 5},
    textShadowRadius: 10,  width:'100%',
  height:'auto'
  },
  Ctitle: {
    fontWeight:'1000',
    padding:10,
    fontSize: windowWidth * 0.06,
    color: "white", 
    textShadowColor: "#00ffff", 
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    backgroundColor:"rgba(200, 220, 230,1)" ,    width:'100%',
    textAlign: "center", 

  },
  profileButton: {
    position: 'absolute', 
    top: -50, 
    right: 10, 
    backgroundColor: '#00ffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  profileButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Categories;
