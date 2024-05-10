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
      {isProfileOpen && <UserProfileScreen onClose={() => setIsProfileOpen(false)} user={{ name: 'John Doe', email: 'john@example.com' }} />}
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
    position: 'relative',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItem: {
    borderWidth: 1,
    borderColor: "#00ffff",
    shadowColor: "#00ffff",
    shadowOpacity: 1,
    shadowRadius: 20,
    marginHorizontal: windowWidth * 0.05,
    marginBottom: windowHeight * 0.02,
    borderRadius: windowWidth * 0.03,
    padding: windowWidth * 0.03,
    alignItems: "center",
    width: (windowWidth - (windowWidth * 0.1)) / 2,
    maxWidth: windowWidth * 0.4,
  },
  categoryImage: {
    borderWidth: 1,
    borderColor: "#00ffff",
    shadowColor: "#00ffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    width: '100%',
    height: windowHeight * 0.2,
    borderRadius: windowWidth * 0.03,
    marginBottom: windowHeight * 0.01,
  },
  categoryName: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    textAlign: "center",
    color: "white",
    textShadowColor: "#00ffff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 9,
  },
  profileButton: {
    position: 'absolute', 
    top: windowHeight * 0.05, 
    right: windowWidth * 0.05, 
    backgroundColor: 'blue',
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
