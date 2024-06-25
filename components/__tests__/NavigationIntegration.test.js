//Интеграционное тестирование
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from './MainScreen';
import IncomeScreen from './IncomeScreen';

test('Переход между MainScreen и IncomeScreen осуществляется без ошибок', () => {
  const Drawer = createDrawerNavigator();
  const { getByText } = render(
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Main" component={MainScreen} />
        <Drawer.Screen name="Income" component={IncomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
  const mainScreenButton = getByText('Main'); // Получение кнопки для перехода на главный экран
  fireEvent.press(mainScreenButton); // Нажатие на кнопку
  const incomeScreenButton = getByText('Income'); // Получение кнопки для перехода на экран доходов
  fireEvent.press(incomeScreenButton); // Нажатие на кнопку
  expect(getByText('Доходы')).toBeTruthy(); // Проверка, что на экране отображается заголовок "Доходы"
});
