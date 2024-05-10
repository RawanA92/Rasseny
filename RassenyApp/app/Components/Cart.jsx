import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const ShoppingCart = ({ cartItems, removeItemFromCart, addItemToCart }) => {
  const renderItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Text style={styles.cartItemTitle}>{item.title}</Text>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeItemFromCart(item)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  cartItemTitle: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};

export default ShoppingCart;
