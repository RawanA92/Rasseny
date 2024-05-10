import { router } from "expo-router";
import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";

const Categories = ({ categoryList }) => {
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => router.replace`(/productList?category=${item.title})`}
    >
      <Image source={{ uri: item.imageURL }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.title}</Text>
    </TouchableOpacity>
  );

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
    color: "#black", 
    textShadowColor: "#00ffff", 
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 9,
  },
});

export default Categories;