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
    <Text style={styles.Ctitle}>Offers</Text>

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: windowHeight * 0.03,
    borderColor: "black",
    width: '100%',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  offersItem: {
    marginHorizontal: windowWidth * 0.05,
    marginBottom: windowHeight * 0.02,
    borderRadius: windowWidth * 0.03,
    alignItems: "center",
    width: (windowWidth - (windowWidth * 0.1)) / 2,
    maxWidth: windowWidth * 0.4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8, // 
  },
  offersImage: {
    width: '100%',
    height: windowHeight * 0.2,
    borderRadius: windowWidth * 0.03,
    marginBottom: windowHeight * 0.01,
    borderColor: '#00ffff',
    borderWidth: 1.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 6.27,
    elevation: 10,
  },
  offersName: {
    fontWeight:'500',
    borderRadius: 10,
    fontSize: windowWidth * 0.04,
    textAlign: "center",
    color: "black",
    textShadowColor: "#00ffff",
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 4,
    width: '100%',
    height: 'auto'
  },
  Ctitle: {
    fontWeight: '1000',
    fontSize: windowWidth * 0.06,
    color: "white",
    textShadowColor: "#00ffff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    marginBottom: -50,
    width: '100%',
    textAlign: "center",
    backgroundColor: "rgba(200, 220, 230,1)"
  },
});

export default Offers;