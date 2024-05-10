    import React, { useEffect, useState } from 'react';
    import { View, Text, Image } from 'react-native';
    import { useLocalSearchParams } from 'expo-router';
    import { db } from '../../firebase/Config';
    import { query, collection, where, getDocs } from 'firebase/firestore';
    import { getFirestore } from 'firebase/firestore';
    
    const ProductDetail = () => {
      const { category } = useLocalSearchParams();
     const [title] = useState (category);
      const [product, setProduct] = useState(null);
      console.log('Title:', title);

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
          <Image style={styles.image} source={{ uri: product.image }} />
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.from}>From: {product.from}</Text>
          <Text style={styles.price}>Price: {product.price} EGB</Text>
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
      price: {
        fontSize: 20,
        color: 'green',
        marginBottom: 10,
      },
      from: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
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
    
    export default ProductDetail;
    
 
      