import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { deleteDoc, doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore"; 
import { db } from "../../firebase/Config";
import { router } from "expo-router"; 

const Categories1 = ({ categoryList }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newImageURL, setNewImageURL] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitleInput, setNewTitleInput] = useState("");
  const [newImageURLInput, setNewImageURLInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); 

  const handleDelete = async (categoryId) => {
    try {
      await deleteDoc(doc(db, "Categories", categoryId));
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdate = (categoryToUpdate) => {
    setModalVisible(true);
    setNewTitleInput(categoryToUpdate.title);
    setNewImageURLInput(categoryToUpdate.imageURL);
  };

  const handleUpdateCategory = async (categoryToUpdate, newTitle, newImageURL) => {
    try {
      const categoryRef = doc(db, "Categories", categoryToUpdate.id);
      const categorySnapshot = await getDoc(categoryRef);
      const categoryData = categorySnapshot.data();

      if (newTitle.trim() !== "") {
        categoryData.title = newTitle.trim();
      }
      if (newImageURL.trim() !== "") {
        categoryData.imageURL = newImageURL.trim();
      }

      await setDoc(categoryRef, categoryData);

      console.log("Category updated successfully");
      setModalVisible(false); 
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleAddCategory = async () => {
    if (!newTitle.trim() || !newImageURL.trim()) {
      Alert.alert(
        "Error",
        "Please enter title and image URL for the new category"
      );
      return;
    }

    const newCategoryData = {
      title: newTitle.trim(),
      imageURL: newImageURL.trim(),
    };

    try {
      const docRef = await addDoc(collection(db, "Categories"), newCategoryData);
      console.log("Document written with ID: ", docRef.id);
      setNewTitle(""); 
      setNewImageURL("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => router.replace(`/productList1?category=${item.title}`)}
      >
        <Image source={{ uri: item.imageURL }} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.title}</Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setSelectedCategory(item)}
        >
          <FontAwesome name="ellipsis-v" size={24} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryList}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.addCategoryContainer}>
        <TextInput
          style={[styles.input, {flex: 1.5}]} 
          placeholder="Category Title"
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <TextInput
          style={[styles.input, {flex: 1.5}]} 
          placeholder="Image URL"
          value={newImageURL}
          onChangeText={setNewImageURL}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
          <FontAwesome name="plus" size={24} color="#f2f2f2" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={[styles.input, { marginBottom: 10 }]} 
              placeholder="New Category Title"
              value={newTitleInput}
              onChangeText={setNewTitleInput}
            />
            <TextInput
              style={[styles.input, { marginBottom: 10 }]} 
              placeholder="New Image URL"
              value={newImageURLInput}
              onChangeText={setNewImageURLInput}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { marginRight: 5 }]} 
                onPress={() => {
                  handleUpdateCategory(selectedCategory, newTitleInput, newImageURLInput);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {selectedCategory && (
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.overlayButton}
            onPress={() => handleDelete(selectedCategory.id)}
          >
            <Text style={styles.overlayText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.overlayButton}
            onPress={() => handleUpdate(selectedCategory)}
          >
            <Text style={styles.overlayText}>Update</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  categoryItem: {
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    padding: 10,
    alignItems: "center",
    position: "relative",
  },
  categoryImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "30%",
    flexDirection: "column",
    alignItems: "center",
  },
  overlayText: {
    fontSize: 18,
  },
  addCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: "#6e8264",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#cccccc",
    marginLeft: 5,
  },
  moreButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
  },
});

export default Categories1;
