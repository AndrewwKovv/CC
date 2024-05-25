import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TimePeriodPicker from './ui/TimePeriodPicker'; // Импортируем компонент выбора периода времени
import IncomeScreen from './IncomeScreen'; // Импортируем экран доходов
import ExpensesScreen from './ExpensesScreen'; // Импортируем экран расходов

const MainScreen = ({ balance, setBalance }) => {
  // Состояния для выбранной вкладки и периода времени
  const [selectedTab, setSelectedTab] = useState('Income');
  const [selectedPeriod, setSelectedPeriod] = useState('day');

  // Функции для обновления баланса при добавлении дохода и расхода
  const handleAddIncome = (amount) => {
    setBalance(balance + amount);
  };

  const handleAddExpense = (amount) => {
    setBalance(balance - amount);
  };

  // Функция для выбора периода времени
  const handleSelectPeriod = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <View style={styles.container}>
      {/* Компоненты выбора вкладки (Доходы / Расходы) */}
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
      {/* Контент в зависимости от выбранной вкладки */}
      <View style={styles.content}>
        {/* Если выбрана вкладка "Доходы", отображается экран доходов, иначе - экран расходов */}
        {selectedTab === 'Income' ? (
          <IncomeScreen selectedPeriod={selectedPeriod} onAddIncome={handleAddIncome}/>
        ) : (
          <ExpensesScreen selectedPeriod={selectedPeriod} onAddExpense={handleAddExpense}/>
        )}
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
    marginBottom: 5,
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
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;

//Этот компонент отображает основной экран приложения, где пользователь может выбирать между вкладками "Доходы" и "Расходы". В зависимости от выбранной вкладки отображается соответствующий экран с помощью компонентов IncomeScreen и ExpensesScreen.