
import { View, Text, Image, FlatList, TouchableOpacity , TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import BackButton from './BackButton'; // Import the BackButton component
const ProductsList = () => {
  
  const {category} = useLocalSearchParams();
  const [title] = useState (category);
  const [storage, setStorage] = useState ([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

const [ratings, setRatings] = useState({});
const navigation = useNavigation();

const goBack = () => {
  navigation.goBack();
};
  
 
    useEffect(()=>{
         getItemListByCategory();
         
         loadRatings();
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
    const loadRatings = async () => {
      try {
        const jsonRatings = await AsyncStorage.getItem('ratings');
        if (jsonRatings) {
          const ratingsObj = JSON.parse(jsonRatings);
          setRatings(ratingsObj);
        }
      } catch (error) {
        console.error('Failed to load ratings:', error);
      }
    };
  
    const saveRatings = async () => {
      try {
        await AsyncStorage.setItem('ratings', JSON.stringify(ratings));
      } catch (error) {
        console.error('Failed to save ratings:', error);
      }
    };
  
    const updateRating = async (itemId, rating) => {
      const newRatings = { ...ratings, [itemId]: rating };
      setRatings(newRatings);
      await saveRatings();
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
    const handleRatingPress = (productId, newRating) => {
      setRatings(prevRatings => ({
        ...prevRatings,
        [productId]: newRating
      }));
    };
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => router.replace(`/productDetail?category=${item.title}`)}
      >
        <Image style={styles.image} source={{ uri: item.image }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }).map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleRatingPress(item.id, index + 1)}
            >
              <Text style={styles.star}>{index < (ratings[item.id] || 0) ? '★' : '☆'}</Text>
            </TouchableOpacity>
            
          ))}
        </View>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => addItemToCart(item)}
        >
          <Text style={styles.addToCartButtonText}>ِAdd To Cart</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
    return(
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
  
  },ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  star: {
    fontSize: 20,
    color: 'gold',
    marginRight: 5,
     
  },
  addToCartButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  addToCartButtonText: {
    color: 'white',
    textAlign: 'center',
  },
};
export default ProductsList;