import { View, Text, Image, FlatList, TouchableOpacity , TextInput } from 'react-native';
import React, { useEffect, useState } from 'react'
import { getFirestore } from 'firebase/firestore';
import { db} from "../../firebase/Config";
import { useLocalSearchParams }from 'expo-router';
import {
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { router } from "expo-router";

const ProductsList = () => {
  
  const {category} = useLocalSearchParams();
  const [title] = useState (category);
  const [storage, setStorage] = useState ([]);
  const [searchQuery, setSearchQuery] = useState('');

  console.log(title); 
  
 
    useEffect(()=>{
         getItemListByCategory();
    },[]); 
     
    const getItemListByCategory =async()=>{

    
        const q = query (collection(db,'products'),where('category', '==', title))
        const snapshot = await getDocs(q);
        const items = [];
        snapshot.forEach(doc=>{
           const item = doc.data();
           items.push(item);
           
        });
        setStorage(items)
        snapshot.forEach((doc =>{
          console.log(doc.id);
        }));
      
    };
    const searchItems = async (searchFor) => {
      if (!searchFor) {
        // If search query is empty, clear the results
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
    const renderItem = ({ item }) => (
      <TouchableOpacity 
     style={styles.itemContainer}
     onPress={() => router.replace(`/productDetail?category=${item.title}`)}
    >
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.from}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
      
    </TouchableOpacity>
    );
    return(
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
    </View>
  );
}
const styles = {
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
};
export default ProductsList;