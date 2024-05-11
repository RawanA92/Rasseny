import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ShoppingCart from "../Components/Cart";
import { useNavigation } from '@react-navigation/native';
import BackButton from '../Components/BackButton'; // Import the BackButton component

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const addItemToCart = (item) => {
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const removeItemFromCart = (itemToRemove) => {
    const updatedCartItems = cartItems.filter(item => item !== itemToRemove);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={goBack} />
      <Text style={styles.title}>Your Cart</Text>
      <ShoppingCart 
        cartItems={cartItems} 
        removeItemFromCart={removeItemFromCart} 
        addItemToCart={addItemToCart}  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Cart;
