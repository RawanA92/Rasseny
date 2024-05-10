
import { View, Text, Image, FlatList, TouchableOpacity, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react'
import { getFirestore } from 'firebase/firestore';
//import { useRoute } from '@react-navigation/native';
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
    const renderItem = ({ item }) => (
      <Pressable  style={styles.itemContainer}
      onPress={() => router.replace(`/productDetail?category=${item.title}`)}>
      <TouchableOpacity 
     style={styles.btn}
     onPress={() => AddToCart(item, cart, setCart, item.quantity)}
    >
      <Image source={cartIcon} style={{ width: 50, height: 50 }} />
      
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price} EGB</Text>
      <Text style={styles.from}>from : {item.from}</Text>
      
    </TouchableOpacity>
    </Pressable>
    );
    return(
     <View style={styles.container}>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

};
export default ProductsList;