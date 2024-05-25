import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Список доступных валют
const currencies = [
  { label: 'Рубль', symbol: ' ₽' },
  { label: 'Доллар', symbol: ' $' },
  { label: 'Евро', symbol: ' €' },
  { label: 'Юань', symbol: ' ¥' },
  { label: 'Тугрик', symbol: ' ₮' },
];

const CurrencyScreen = ({ currency, setCurrency }) => {
  // Функция для обработки изменения выбранной валюты
  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency.symbol);
  };

  return (
    <View style={styles.container}>
      {/* Отображение списка валют */}
      {currencies.map((currencyItem) => (
        <TouchableOpacity
          key={currencyItem.label}
          style={[
            styles.currencyItem,
            currency === currencyItem.symbol && styles.selectedCurrencyItem,
          ]}
          onPress={() => handleCurrencyChange(currencyItem)}
        >
          <Text
            style={[
              styles.currencyText,
              currency === currencyItem.symbol && styles.selectedCurrencyText,
            ]}
          >
            {currencyItem.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Стили компонента
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
  },
  currencyItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedCurrencyItem: {
    backgroundColor: '#4566ed',
  },
  currencyText: {
    fontSize: 18,
    color: '#fff',
  },
  selectedCurrencyText: {
    color: '#fff',
  },
});

export default CurrencyScreen;

//Этот компонент отображает список валют, предоставляя пользователю возможность выбора. Каждый элемент списка представлен кнопкой TouchableOpacity, при нажатии на которую вызывается функция handleCurrencyChange, чтобы установить выбранную валюту. Стили определены для оформления компонента, включая подсветку выбранной валюты.
