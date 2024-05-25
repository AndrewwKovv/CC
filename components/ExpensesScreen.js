import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CategoryItem from './Category/CategoryItem';
import { loadCategories } from './db/CategoriesLoader';

// Функция для получения текущей даты или периода
const getCurrentDate = (period) => {
  const today = new Date();
  switch (period) {
    case 'День':
      return `Сегодня, ${today.toLocaleDateString('default', { month: 'long', day: 'numeric' })}`;
    case 'Неделя':
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
      return `${startOfWeek.toLocaleDateString('default', { month: 'long', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('default', { month: 'long', day: 'numeric' })}`;
    case 'Месяц':
      return today.toLocaleDateString('default', { month: 'long', year: 'numeric' });
    case 'Год':
      return today.getFullYear().toString();
    case 'Период':
      return 'Выберите период';
    default:
      return `Сегодня, ${today.toLocaleDateString('default', { month: 'long', day: 'numeric' })}`;
  }
};

// Функция для фильтрации операций по периоду
const filterOperationsByPeriod = (operations, period) => {
  const today = new Date();
  switch (period) {
    case 'День':
      return operations.filter(op => {
        const opDate = new Date(op.date);
        return opDate.toDateString() === today.toDateString();
      });
    case 'Неделя':
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
      return operations.filter(op => {
        const opDate = new Date(op.date);
        return opDate >= startOfWeek && opDate <= endOfWeek;
      });
    case 'Месяц':
      return operations.filter(op => {
        const opDate = new Date(op.date);
        return opDate.getMonth() === today.getMonth() && opDate.getFullYear() === today.getFullYear();
      });
    case 'Год':
      return operations.filter(op => {
        const opDate = new Date(op.date);
        return opDate.getFullYear() === today.getFullYear();
      });
    case 'Период':
      // Для пользовательского периода нужно будет добавить логику выбора дат
      return operations;
    default:
      return operations;
  }
};

const ExpensesScreen = ({ selectedPeriod, selectedDate, onUpdateBalance }) => {
  const navigation = useNavigation();
  const [expensesOperations, setExpensesOperations] = useState([]);
  const [categories, setCategories] = useState({});
  const [currency, setCurrency] = useState('₽');
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [period, setPeriod] = useState('День');
  const [date, setDate] = useState(getCurrentDate('День'));

  useEffect(() => {
    const fetchCategoriesAndOperations = async () => {
      const loadedCategories = await loadCategories();
      setCategories(loadedCategories);
      loadOperations('Expenses', loadedCategories);
    };

    fetchCategoriesAndOperations();
    loadCurrency();
  }, []);

  useEffect(() => {
    setDate(getCurrentDate(period));
    loadOperations('Expenses', categories);
  }, [period]);

  const loadOperations = async (operationType, categories) => {
    try {
      const operationsData = await AsyncStorage.getItem('operations');
      if (operationsData) {
        const operations = JSON.parse(operationsData);
        const filteredOperations = operations.filter(operation => operation.type === operationType);
        const enhancedOperations = filteredOperations.map(operation => ({
          ...operation,
          categoryDetails: categories.expensesCategories.find(cat => cat.label === operation.category) || {}
        }));
        const operationsForPeriod = filterOperationsByPeriod(enhancedOperations, period);
        setExpensesOperations(operationsForPeriod);
      }
    } catch (error) {
      console.error('Error loading operations:', error);
    }
  };

  const loadCurrency = async () => {
    try {
      const storedCurrency = await AsyncStorage.getItem('currency');
      if (storedCurrency) {
        setCurrency(storedCurrency);
      }
    } catch (error) {
      console.error('Error loading currency:', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.operationItem}
      onLongPress={() => setDeleteIndex(index)}
    >
      <CategoryItem
        color={item.categoryDetails.color}
        iconName={item.categoryDetails.iconName}
        label={item.categoryDetails.label}
        size={62}
      />
      <Text style={styles.amountText}>{item.amount} {currency}</Text>
      {deleteIndex === index && (
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteOperation(item, index)}>
          <Text style={styles.deleteButtonText}>Удалить</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const handleAddExpenses = () => {
    navigation.navigate('AddOperationScreen', { onUpdateBalance });
  };

  const handleDeleteOperation = async (operation, index) => {
    try {
      const updatedOperations = expensesOperations.filter((_, i) => i !== index);
      setExpensesOperations(updatedOperations);
      await AsyncStorage.setItem('operations', JSON.stringify(updatedOperations));
      onUpdateBalance(operation.amount, 'Expenses');
      setDeleteIndex(null);
    } catch (error) {
      console.error('Error deleting operation:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {['День', 'Неделя', 'Месяц', 'Год', 'Период'].map(p => (
          <TouchableOpacity
            key={p}
            style={[styles.tab, period === p && styles.activeTab]}
            onPress={() => setPeriod(p)}
          >
            <Text style={styles.tabText}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.dateText}>{date}</Text>
        </TouchableOpacity>
      </View>
      {expensesOperations.length === 0 ? (
        <View style={styles.noOperationsContainer}>
          <Text style={styles.noOperationsText}>Операций нет</Text>
        </View>
      ) : (
        <FlatList
          data={expensesOperations}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddExpenses}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#fff',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    marginBottom: 20,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 80,
  },
  operationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  amountText: {
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4287f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 30,
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
  noOperationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOperationsText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default ExpensesScreen;