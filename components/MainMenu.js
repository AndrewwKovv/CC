import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Импорт иконок AntDesign
import { DrawerContentScrollView } from '@react-navigation/drawer'; // Импорт компонента прокрутки содержимого бокового меню

const DrawerContent = ({ navigation }) => {
  // Функция для перехода к указанному экрану
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {/* Прокручиваемое содержимое бокового меню */}
      <DrawerContentScrollView>
        {/* Элементы бокового меню */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateToScreen('MainScreen')}>
          <AntDesign name="home" size={24} color="black" style={styles.icon} />
          <Text style={styles.menuItemText}>Главная</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateToScreen('CategoriesScreen')}>
          <AntDesign name="appstore-o" size={24} color="black" style={styles.icon} />
          <Text style={styles.menuItemText}>Категории</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateToScreen('CurrencyScreen')}>
          <AntDesign name="wallet" size={24} color="black" style={styles.icon} />
          <Text style={styles.menuItemText}>Валюта</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

// Стили компонента
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
  },
});

export default DrawerContent;
//Этот компонент представляет собой боковое меню для навигации в приложении. Он содержит элементы меню, каждый из которых представляет собой кнопку с иконкой и текстом. 
