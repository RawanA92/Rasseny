import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import "firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import Offers from "../Components/Offers";
import Categories from "../Components/Categories1";
import { db } from "../../firebase/Config";
import { useNavigation } from '@react-navigation/native';
import BackButton from '../Components/BackButton'; // Import the BackButton component
const Home = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offersList, setOffersList] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    getCategoryList();
    getOffersList();
  }, []);

  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Categories"));
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategoryList(categoriesData);
      setLoading(false);
      console.log("Category list:", categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  const getOffersList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Offers"));
      const offersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOffersList(offersData);
      setLoadingOffers(false);
      console.log("Offers list:", offersData);
    } catch (error) {
      console.error("Error fetching offers:", error);
      setLoadingOffers(false);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={goBack} />
      <View style={styles.section}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Categories categoryList={categoryList} />
        )}
      </View>
      <View style={styles.section}>
        {loadingOffers ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Offers offersList={offersList} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"rgba(200, 220, 230,.75)"
  },
  section: {
    flex: 1,
    width: "100%",
    height:'100%'
  },
});

export default Home;