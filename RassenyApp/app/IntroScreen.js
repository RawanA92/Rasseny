import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

const IntroScreen = () => {
  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Welcome to Raceny!
      </Animatable.Text>
      <Animatable.Text animation="fadeInUp" style={styles.subtitle}>
        Let's get started
      </Animatable.Text>
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
    backgroundColor: '#fff',
    width: windowWidth * 0.9, 
    marginHorizontal: windowWidth * 0.05, 
  },
  title: {
    fontSize: windowWidth * 0.08, 
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.03, 
  },
  subtitle: {
    fontSize: windowWidth * 0.06, 
    marginTop: windowHeight * 0.03, 
  },
});

export default IntroScreen;
