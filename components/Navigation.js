import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './MainMenu'; // Импорт компонента бокового меню
import MainScreen from './MainScreen'; // Импорт основного экрана
import IncomeScreen from './IncomeScreen'; // Импорт экрана доходов
import ExpensesScreen from './ExpensesScreen'; // Импорт экрана расходов
import CategoriesScreen from './Category/CategoriesScreen'; // Импорт экрана категорий
import CurrencyScreen from './Currency/CurrencyScreen'; // Импорт экрана валюты
import AddOperationScreen from './AddOperationScreen'; // Импорт экрана добавления операции

const Drawer = createDrawerNavigator();

const Navigation = () => {
  return (
    // Навигационный контейнер для навигации в приложении
    <NavigationContainer>
      {/* Навигатор с боковым меню */}
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        {/* Экран основного содержимого */}
        <Drawer.Screen name="MainScreen" component={MainScreen} />
        {/* Экран доходов */}
        <Drawer.Screen name="IncomeScreen" component={IncomeScreen} />
        {/* Экран расходов */}
        <Drawer.Screen name="ExpensesScreen" component={ExpensesScreen} />
        {/* Экран категорий */}
        <Drawer.Screen name="CategoriesScreen" component={CategoriesScreen} />
        {/* Экран выбора валюты */}
        <Drawer.Screen name="CurrencyScreen" component={CurrencyScreen} />
        {/* Экран добавления операции */}
        <Drawer.Screen name="AddOperationScreen" component={AddOperationScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

// Этот компонент определяет навигацию в вашем приложении, используя библиотеку react-navigation. Он создает боковое меню (DrawerNavigator), которое содержит различные экраны, такие как главный экран, экраны доходов и расходов, экраны категорий и т.д.