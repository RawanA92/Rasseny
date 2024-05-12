    import React, { useEffect, useState } from 'react';
    import { View, Text, Image  ,Dimensions} from 'react-native';
    import { useLocalSearchParams } from 'expo-router';
    import { db } from '../../firebase/Config';
    import { query, collection, where, getDocs } from 'firebase/firestore';
    import { getFirestore } from 'firebase/firestore';
    import { useNavigation } from '@react-navigation/native';
    import BackButton from '../Components/BackButton'; // Import the BackButton component
    const ProductDetail = () => {
      const { category } = useLocalSearchParams();
     const [title] = useState (category);
      const [product, setProduct] = useState(null);
      console.log('Title:', title);
      const navigation = useNavigation();

      const goBack = () => {
        navigation.goBack();
      };
      useEffect(() => {
        getdetails();
        
      }, []);
    
      const getdetails = async () => {
        try {
          const q = query(collection(db,'products'),where("title", '==', title));
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
          <Text style={styles.from}>From: {product.from}</Text>
          <Text style={styles.price}>Price: {product.price} EGB</Text>
          <Text style={styles.info}>{product.info}</Text>
          
        </View>
      );
    };
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const styles = {
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
      marginVertical: 10,},
    
      price: {
        fontSize: 20,
        color: 'green',
        marginBottom: 10,
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
    };
    export default ProductDetail;
 
      