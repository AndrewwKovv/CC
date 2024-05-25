import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Импорт иконок AntDesign

const CategoryItem = ({ color, iconName, label, size = 82 }) => {
  return (
    // Отображение элемента категории
    <View style={[styles.container, { backgroundColor: color, width: size, height: size }]}>
      {/* Иконка категории */}
      <AntDesign name={iconName} size={24} color="white" />
      {/* Подпись категории */}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

// Стили компонента
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12
  },
});

export default CategoryItem;
