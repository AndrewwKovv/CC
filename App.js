import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from './components/MainScreen'; // импорт основного экрана
import DrawerContent from './components/MainMenu'; // импорт содержимого бокового меню
import IncomeScreen from './components/IncomeScreen'; // импорт экрана доходов
import ExpensesScreen from './components/ExpensesScreen'; // импорт экрана расходов
import CategoriesScreen from './components/Category/CategoriesScreen'; // импорт экрана категорий
import CurrencyScreen from './components/Currency/CurrencyScreen'; // импорт экрана валюты
import SplashScreen from './components/SplashScreen'; // импорт экрана загрузки
import AddOperationScreen from './components/AddOperationScreen'; // импорт экрана добавления операции
import AsyncStorage from '@react-native-async-storage/async-storage'; // импорт AsyncStorage для хранения данных

const Drawer = createDrawerNavigator();

const App = () => {
  // Состояния для баланса, валюты и состояния загрузки
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState('₽');
  const [loading, setLoading] = useState(true);

  // Опции для заголовка
  const headerOptions = {
    title: `Баланс: ${balance} ${currency}`,
    headerStyle: {
      backgroundColor: '#333',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  // Эффект для установки состояния загрузки и задержки перед отображением основного экрана
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  // Эффект для загрузки сохраненной валюты и операций при монтировании компонента
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const storedCurrency = await AsyncStorage.getItem('currency');
        if (storedCurrency !== null) {
          setCurrency(storedCurrency);
        }
      } catch (error) {
        console.error('Error fetching currency from AsyncStorage:', error);
      }
    };

    const fetchOperations = async () => {
      try {
        const operationsData = await AsyncStorage.getItem('operations');
        if (operationsData) {
          const operations = JSON.parse(operationsData);
          updateBalance(operations);
        }
      } catch (error) {
        console.error('Error fetching operations from AsyncStorage:', error);
      }
    };

    fetchCurrency();
    fetchOperations();
  }, []);

  // Функция для обновления баланса на основе операций
  const updateBalance = (operations) => {
    let totalIncome = 0;
    let totalExpense = 0;

    operations.forEach(operation => {
      if (operation.type === 'Income') {
        totalIncome += operation.amount;
      } else if (operation.type === 'Expense') {
        totalExpense += operation.amount;
      }
    });

    setBalance(totalIncome - totalExpense);
  };

  // Функция для обновления баланса при нажатии на текст баланса
  const handleBalancePress = () => {
    const fetchOperations = async () => {
      try {
        const operationsData = await AsyncStorage.getItem('operations');
        if (operationsData) {
          const operations = JSON.parse(operationsData);
          updateBalance(operations);
        }
      } catch (error) {
        console.error('Error fetching operations from AsyncStorage:', error);
      }
    };

    fetchOperations();
  };
    // Функция для обработки изменения валюты
  const handleCurrencyChange = async (selectedCurrency) => {
    setCurrency(selectedCurrency);
    try {
      await AsyncStorage.setItem('currency', selectedCurrency);
    } catch (error) {
      console.error('Error saving currency to AsyncStorage:', error);
    }
  };

  // Отображение экрана загрузки, пока состояние loading равно true
  if (loading) {
    return <SplashScreen />;
  }

  // Возвращаем навигатор с боковым меню
  return (
    <NavigationContainer>
      <Drawer.Navigator onPress={handleBalancePress} drawerContent={(props) => <DrawerContent {...props} balance={balance} currency={currency} />}>
        {/* Основной экран с балансом */}
        <Drawer.Screen name="MainScreen" options={headerOptions}>
          {() => <MainScreen balance={balance} setBalance={setBalance} currency={currency} />}
        </Drawer.Screen>
        {/* Экран доходов */}
        <Drawer.Screen
          name="IncomeScreen"
          options={{ title: 'Доходы', ...headerOptions }}
        >
          {() => <IncomeScreen />}
        </Drawer.Screen>
        {/* Экран расходов */}
        <Drawer.Screen
          name="ExpensesScreen"
          options={{ title: 'Расходы', ...headerOptions }}
        >
          {() => <ExpensesScreen />}
        </Drawer.Screen>
        {/* Экран категорий */}
        <Drawer.Screen
          name="CategoriesScreen"
          component={CategoriesScreen}
          options={{ title: 'Категории', ...headerOptions }}
        />
        {/* Экран выбора валюты */}
        <Drawer.Screen
          name="CurrencyScreen"
          options={{ title: 'Валюта', ...headerOptions }}
        >
          {() => <CurrencyScreen currency={currency} setCurrency={handleCurrencyChange} />}
        </Drawer.Screen>
        {/* Экран добавления операции */}
        <Drawer.Screen
          name="AddOperationScreen"
          component={AddOperationScreen}
          options={{ title: 'Добавить операцию', ...headerOptions }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;