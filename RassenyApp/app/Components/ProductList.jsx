
import { View, Text, Image, FlatList, TouchableOpacity , TextInput ,Dimensions } from 'react-native';
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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = {
  container: {
    backgroundColor: "rgba(200, 220, 230,.75)",

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: windowHeight * 0.03, 
    borderRadius:30,
  },
  itemContainer: {
    marginHorizontal: windowWidth * 0.05, 
    marginBottom: windowHeight * 0.02, 
    borderRadius: windowWidth * 0.03, 
    alignItems: "center",
    width: (windowWidth - (windowWidth * 0.1)) / 2, 
    maxWidth: windowWidth * 0.4, 
  },
  title: {
    borderRadius:10, 
    fontSize: windowWidth * 0.05,
    textAlign: "center", 
    color: "white", 
    textShadowColor: "#00ffff", 
    fontWeight:'850',

    textShadowOffset: { width: 1, height: 5},
    textShadowRadius: 10,  width:'100%',
  height:'auto'
  },
  price: {
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    color: 'green', 
    textAlign: "center",
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
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  star: {
    fontSize: 20,
    color: 'gold',
    marginRight: 5,
     
  },
  addToCartButton: {
    backgroundColor: "#00ffff",
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