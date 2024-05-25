import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CategoryItem from './CategoryItem'; // Импорт компонента CategoryItem
import categoriesData from '../db/categories.json'; // Импорт данных категорий из JSON файла

const CategoriesScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Income'); // Состояние для выбранной вкладки
  const [categories, setCategories] = useState([]); // Состояние для списка категорий

  useEffect(() => {
    // Выбор категорий в зависимости от выбранной вкладки
    const selectedCategories = selectedTab === 'Income'
      ? categoriesData.incomeCategories // В случае "Доходы" выбираем категории доходов
      : categoriesData.expenseCategories; // В случае "Расходы" выбираем категории расходов
    setCategories(selectedCategories);
  }, [selectedTab]); // Зависимость: выбранная вкладка

  return (
    <View style={styles.container}>
      {/* Вкладки "Доходы" и "Расходы" */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          onPress={() => setSelectedTab('Income')}
          style={[styles.tab, selectedTab === 'Income' ? styles.selectedTab : null]}
        >
          <Text style={[styles.tabText, selectedTab === 'Income' ? styles.selectedTabText : null]}>Доходы</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setSelectedTab('Expenses')}
          style={[styles.tab, selectedTab === 'Expenses' ? styles.selectedTab : null]}
        >
          <Text style={[styles.tabText, selectedTab === 'Expenses' ? styles.selectedTabText : null]}>Расходы</Text>
        </TouchableOpacity>
      </View>
      {/* Отображение категорий */}
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <CategoryItem 
            key={category.label}
            color={category.color}
            iconName={category.iconName}
            label={category.label}
            size={82}
          />
        ))}
      </View>
    </View>
  );
};

// Стили компонента
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedTab: {
    borderBottomColor: '#fff',
  },
  selectedTabText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default CategoriesScreen;