import { View, Text, Image, FlatList, TouchableOpacity ,Dimensions  ,StyleSheet} from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import BackButton from '../Components/BackButton';
const OfferDetail  = () => {
    const { category } = useLocalSearchParams();
   const [title] = useState (category);
    const [product, setProduct] = useState(null);
    const navigation = useNavigation();
  
    const goBack = () => {
      navigation.goBack();
    };
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
        <BackButton onPress={goBack} />
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
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: windowHeight * 0.03,
        borderColor: "black",
        width: '100%',
        backgroundColor:"rgba(200, 220, 230,.75)",
      },
      title: {
        fontWeight: 'bold',
        fontSize: windowWidth * 0.06,
        color: "white",
        textShadowColor: "#00ffff",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
        textAlign:"center",
        backgroundColor: "rgba(200, 220, 230,1)",
        marginVertical: 10,
      },
      newprice: {
        fontSize: windowWidth * 0.04,
        color: 'green',
        marginBottom: 10,
      },
      oldprice: {
        fontSize: windowWidth * 0.04,
        color: 'green',
        marginBottom: 10,
        textDecorationLine: 'line-through',
      },
      offer: {
        fontSize: windowWidth * 0.04,
        color: 'green',
        marginBottom: 10,
      },
      from: {
        fontSize: windowWidth * 0.04,
        fontWeight: 'bold',
        marginVertical: 10,
      },
      info: {
        fontSize: windowWidth * 0.04,
        textAlign: 'center',
        marginHorizontal: 20,
      },
      image: {
        width: '100%',
        height: windowHeight * 0.2,
        resizeMode: 'contain',
        marginBottom: 10,
        borderRadius: windowWidth * 0.03,
        borderColor: '#00ffff',
        borderWidth: 1.8,
      },
    });
  export default OfferDetail;  