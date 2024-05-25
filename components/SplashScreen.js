import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';

const SplashScreen = () => {
  const welcomeText = Platform.OS === 'ios' ? 'Добро пожаловать, Человек года' : 'Броуки достали Android`ы';

  return (
    <View style={styles.container}>
      <Image source={require('./ui/log.png')} style={styles.logo} />
      <Text style={styles.text}>{welcomeText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  logo: {
    width: 128,
    height: 128,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
});

export default SplashScreen;

// Компонент загрузочного экрана
