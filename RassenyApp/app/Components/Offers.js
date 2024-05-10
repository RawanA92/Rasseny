import { router } from "expo-router";
import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";

const Offers = ({ offersList }) => {
  const renderOffersItem = ({ item }) => (
    <TouchableOpacity
      style={styles.offersItem}
      onPress={() => router.replace(`/offerDetail?category=${item.title}`)}
    >
      <Image source={{ uri: item.image }} style={styles.offersImage} />
      <Text style={styles.offersName}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={offersList}
        renderItem={renderOffersItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
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
    borderRadius:20,
    
    borderWidth: 2,
    borderColor: "black", 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: windowHeight * 0.08, 
    shadowColor: "#00ffff", 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    

  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  offersItem: {
    borderWidth: 1,
    borderColor: "#00ffbc", 
    shadowColor: "#00ffff", 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1, 
    shadowRadius: 20,
    marginHorizontal: windowWidth * 0.05, 
    marginBottom: windowHeight * 0.02, 
    borderRadius: windowWidth * 0.03, 
    padding: windowWidth * 0.03, 
    alignItems: "center",
    width: (windowWidth -     (windowWidth * 0.1)) / 2, 
    maxWidth: windowWidth * 0.4, 
  },
  offersImage: {
    width: '100%',
    height: windowHeight * 0.2, 
    borderRadius: windowWidth * 0.03, 
    marginBottom: windowHeight * 0.01, 
  },
  offersName: {
    fontSize: windowWidth * 0.04, 
    fontWeight: "bold",
    textAlign: "center", 
  },
});

export default Offers;