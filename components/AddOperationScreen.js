import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import CategoryItem from './Category/CategoryItem'; // Импорт компонента CategoryItem
import DateTimePicker from '@react-native-community/datetimepicker'; // Импорт компонента выбора даты и времени
import AsyncStorage from '@react-native-async-storage/async-storage'; // Импорт AsyncStorage для хранения данных
import { AntDesign } from '@expo/vector-icons'; // Импорт иконок AntDesign

const AddOperationScreen = ({ navigation }) => {
  const [amount, setAmount] = useState(''); // Состояние для введенной суммы операции
  const [selectedCategory, setSelectedCategory] = useState(null); // Состояние для выбранной категории операции
  const [selectedDate, setSelectedDate] = useState(new Date()); // Состояние для выбранной даты операции
  const [showDatePicker, setShowDatePicker] = useState(false); // Состояние для отображения/скрытия компонента выбора даты
  const [categories, setCategories] = useState({ incomeCategories: [], expenseCategories: [] }); // Состояние для списка категорий
  const [operationType, setOperationType] = useState('Income'); // Состояние для типа операции (Доходы/Расходы)
  const [currency, setCurrency] = useState('₽'); // Состояние для выбранной валюты операции
  const [selectedDateButton, setSelectedDateButton] = useState('today'); // Состояние для отслеживания выбранной кнопки даты

  useEffect(() => {
    loadCategories(); // Загрузка категорий при монтировании компонента
    loadCurrency(); // Загрузка валюты при монтировании компонента
  }, []);

  // Загрузка категорий из AsyncStorage
  const loadCategories = async () => {
    try {
      const categoriesData = await AsyncStorage.getItem('categories');
      if (categoriesData) {
        setCategories(JSON.parse(categoriesData));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  // Загрузка валюты из AsyncStorage
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

  // Сохранение операции в AsyncStorage
  const saveOperation = async (operation) => {
    try {
      const operationsData = await AsyncStorage.getItem('operations');
      let operations = [];
      if (operationsData) {
        operations = JSON.parse(operationsData);
      }
      operations.push(operation);
      await AsyncStorage.setItem('operations', JSON.stringify(operations));
    } catch (error) {
      console.error('Error saving operation:', error);
    }
  };

  // Обработчик добавления операции
  const handleAddOperation = async () => {
    const newOperation = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category: selectedCategory,
      date: selectedDate.toISOString(),
      type: operationType, // Используйте текущий тип операции
    };

    // Сохранение операции в AsyncStorage
    saveOperation(newOperation);

    // Сброс значений полей и переход на предыдущий экран
    setAmount('');
    setSelectedCategory(null);
    navigation.goBack();
  };

  // Обработчик выбора даты из компонента DateTimePicker
  const handleSelectDate = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setSelectedDateButton(null); // Очистка выбранной кнопки даты при выборе пользовательской даты
    }
  };

  // Отображение категорий
  const renderCategories = () => {
    const categoriesList = operationType === 'Income' ? categories.incomeCategories : categories.expenseCategories;
    return categoriesList.map(category => (
      <TouchableOpacity
        key={category.label}
        style={[styles.categoryItem, selectedCategory === category.label && styles.selectedCategory]}
        onPress={() => setSelectedCategory(category.label)}
      >
        <CategoryItem
          color={category.color}
          iconName={category.iconName}
          label={category.label}
        />
      </TouchableOpacity>
    ));
  };

  const getFormattedDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}`;
  };

  const handleToday = () => {
    setSelectedDate(new Date());
    setSelectedDateButton('today');
  };

  const handleYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setSelectedDate(yesterday);
    setSelectedDateButton('yesterday');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, operationType === 'Income' && styles.selectedTab]}
              onPress={() => setOperationType('Income')}
            >
              <Text style={[styles.tabText, operationType === 'Income' && styles.selectedTabText]}>Доходы</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, operationType === 'Expense' && styles.selectedTab]}
              onPress={() => setOperationType('Expense')}
            >
              <Text style={[styles.tabText, operationType === 'Expense' && styles.selectedTabText]}>Расходы</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Сумма"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor="#4287f5"
              />
              <Text style={styles.currency}>{currency}</Text>
            </View>
            <View style={styles.categories}>
              {renderCategories()}
            </View>
            <View style={styles.datePicker}>
              <View style={styles.datePickerButtons}>
                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    selectedDateButton === 'today' && styles.selectedDateButton,
                  ]}
                  onPress={handleToday}
                >
                  <Text style={styles.dateButtonText}>{getFormattedDate(new Date())}</Text>
                  <Text style={styles.dateButtonSubText}>Сегодня</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    selectedDateButton === 'yesterday' && styles.selectedDateButton,
                  ]}
                  onPress={handleYesterday}
                >
                  <Text style={styles.dateButtonText}>{getFormattedDate(new Date(Date.now() - 86400000))}</Text>
                  <Text style={styles.dateButtonSubText}>Вчера</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                  <AntDesign name="calendar" size={24} color="#fff" />
                  <Text style={styles.dateButtonText}>{getFormattedDate(selectedDate)}</Text>
                </TouchableOpacity>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  onChange={handleSelectDate}
                />
              )}
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.addButton, (!amount || !selectedCategory) && styles.disabledButton]}
            onPress={handleAddOperation}
            disabled={!amount || !selectedCategory}
          >
            <Text style={styles.buttonLabel}>Добавить</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonLabel}>Назад</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding:10,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Extra padding to ensure the content is scrollable above the buttons
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#333',
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
  },
  content: {
    paddingVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#4287f5',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    color: '#4287f5',
  },
  currency: {
    fontSize: 18,
    color: '#4287f5',
    marginLeft: 10,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  selectedCategory: {
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 12,
    margin: 5,
  },
  datePicker: {
    marginBottom: 20,
  },
  datePickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dateButton: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  selectedDateButton: {
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  dateButtonSubText: {
    color: '#aaa',
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#4287f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
    marginRight: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 30,
    left: 10,
    right: 10,
  },
  button: {
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 18,
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    marginLeft: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default AddOperationScreen;
