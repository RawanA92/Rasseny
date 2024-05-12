import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, Alert, Modal , Dimensions } from 'react-native';
import { getDocs, setDoc, deleteDoc, doc, collection, query, where, addDoc } from "firebase/firestore";
import { db } from "../../firebase/Config";
import { useLocalSearchParams } from 'expo-router';
import { router } from "expo-router";
import BackButton from './BackButton'; // Import the BackButton component
import { useNavigation } from '@react-navigation/native';
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
  const [newCategory, setNewCategory] = useState("");
  const [newInfo, setNewInfo] = useState("");
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
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

  const handleAddProduct = async () => {
    try {
      await addDoc(collection(db, 'products'), {
        title: newTitle,
        image: newImageURL,
        from: newFrom,
        price: newPrice,
        category: newCategory,
        info: newInfo
      });
      Alert.alert("Success", "Product added successfully.");
      setModalVisible(false);
      getItemListByCategory();
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Error", "Failed to add product.");
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
        category: newCategory,
        info: newInfo
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
      <BackButton onPress={goBack} />
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

      <TouchableOpacity style={[styles.button, styles.addButton]} onPress={() => { setSelectedProduct(null); setModalVisible(true); }}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>

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
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={newCategory}
              onChangeText={setNewCategory}
            />
            <TextInput
              style={styles.input}
              placeholder="Info"
              value={newInfo}
              onChangeText={setNewInfo}
            />
            <TouchableOpacity style={styles.modalButton} onPress={selectedProduct ? handleUpdateProduct : handleAddProduct}>
              <Text style={styles.modalButtonText}>{selectedProduct ? "Update Product" : "Add Product"}</Text>
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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = {
  container: {
    flex: 1,
  },
  itemContainer: {
    marginHorizontal: windowWidth * 0.05, 
    marginBottom: windowHeight * 0.02, 
    borderRadius: windowWidth * 0.03, 
    alignItems: "center",
    width: (windowWidth - (windowWidth * 0.1)) / 2, 
    maxWidth: windowWidth * 0.4, 
  },
  detailsContainer: {
    flex: 1, 
    marginLeft: 10, 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: windowHeight * 0.03, 
    borderRadius:30,
  },
  title: {
    borderRadius:10, 
    fontSize: windowWidth * 0.05,
    textAlign: "center", 
    color: "black", 
    textShadowColor: "#00ffff", //shadow
    fontWeight:'850',

    textShadowOffset: { width: 1, height: 5},
    textShadowRadius: 10,  width:'100%',
    height:'auto'

  },
  info: {
    fontSize: 16,
    marginTop: 5,
  },
  image: {
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white", 
    fontSize: windowWidth * 0.04, 
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
  addButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
};

export default ProductsList1;
