import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { getFirestore } from 'firebase/firestore';
import { db } from "../../firebase/Config";
import { useLocalSearchParams } from 'expo-router';
import { getDocs, setDoc, deleteDoc, doc, collection, query, where } from "firebase/firestore";
import { router } from "expo-router";

const ProductsList1 = () => {

  const { category } = useLocalSearchParams();
  const [title] = useState(category);
  const [storage, setStorage] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newImageURL, setNewImageURL] = useState("");
  const [newFrom, setNewFrom] = useState("");
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    getItemListByCategory();
  }, []);

  const getItemListByCategory = async () => {
    const q = query(collection(db, 'products'), where('category', '==', title));
    const snapshot = await getDocs(q);
    const items = [];
    snapshot.forEach(doc => {
      const item = { ...doc.data(), id: doc.id }; 
      items.push(item);
    });
    setStorage(items);
  };

  const searchItems = async (searchFor) => {
    if (!searchFor) {
      setStorage([]);
      return;
    }

    const q = query(collection(db, 'products'), where('title', '>=', searchQuery.trim().toUpperCase()));
    const snapshot = await getDocs(q);
    const items = [];
    snapshot.forEach(doc => {
      const item = doc.data();
      if (item.title.toUpperCase().startsWith(searchQuery.trim().toUpperCase())) {
        items.push(item);
      }
    });
    setStorage(items);
  };

  const handleUpdate = (item) => {
    setSelectedProduct(item);
    setNewTitle(item.title);
    setNewImageURL(item.image);
    setNewFrom(item.from);
    setNewPrice(item.price);
    setModalVisible(true);
  };

  const handleDelete = async (item) => {
    try {
      await deleteDoc(doc(db, 'products', item.id));
      Alert.alert("Success", "Product deleted successfully.");
      getItemListByCategory(); 
    } catch (error) {
      console.error("Error deleting product:", error);
      Alert.alert("Error", "Failed to delete product.");
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const productRef = doc(db, 'products', selectedProduct.id);
      await setDoc(productRef, {
        title: newTitle,
        image: newImageURL,
        from: newFrom,
        price: newPrice,
        category: title 
      });
      Alert.alert("Success", "Product updated successfully.");
      setModalVisible(false);
      getItemListByCategory();
    } catch (error) {
      console.error("Error updating product:", error);
      Alert.alert("Error", "Failed to update product.");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.replace(`/productDetail?category=${item.title}`)}
    >
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.info}>{item.from}</Text>
        <Text style={styles.info}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleUpdate(item)}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleDelete(item)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={searchItems}
      />
      <FlatList
        data={storage}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={newImageURL}
              onChangeText={setNewImageURL}
            />
            <TextInput
              style={styles.input}
              placeholder="From"
              value={newFrom}
              onChangeText={setNewFrom}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={newPrice}
              onChangeText={setNewPrice}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleUpdateProduct}>
              <Text style={styles.modalButtonText}>Update Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1, 
    marginLeft: 10, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
};

export default ProductsList1;