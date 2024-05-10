/*import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react'
import { getFirestore } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
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

const OfferDetail  = () => {
    const { category } = useLocalSearchParams();
   const [title] = useState (category);
    const [product, setProduct] = useState(null);
    console.log('Title:', title);

    useEffect(() => {
      getdetails();
      
    }, []);
  
    const getdetails = async () => {
      try {
        const q = query(collection(db,'Offers'),where("title", '==', title));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
          setProduct(doc.data());
        });
      } catch (error) {
        console.error('Error getting documents: ', error);
      }
    };
  
    if (!product) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: product.image }} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.newprice}>{product.newprice}</Text>
        <Text style={styles.oldprice}>{product.oldprice}</Text>
        <Text style={styles.offer}>offer:{product.offer}</Text>
        <Text style={styles.from}>from:{product.from}</Text>
        <Text style={styles.info}>{product.info}</Text>
      </View>
    );
  };
  
  const styles = {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    from: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
      },
    newprice: {
      fontSize: 20,
      color: 'green',
      marginBottom: 10,
    },
    oldprice: {
        fontSize: 20,
        color: 'green',
        marginBottom: 10,
        textDecorationLine: 'line-through', // إضافة تأثير الخط على العرض
      },
      offer: {
        fontSize: 20,
        color: 'green',
        marginBottom: 10,
      },
    info: {
      fontSize: 16,
      textAlign: 'center',
      marginHorizontal: 20,
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
      marginBottom: 10,
    },
  };
  
  export default OfferDetail;
  
*/
    