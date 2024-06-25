//Интеграционное тестирование
import { render, fireEvent } from '@testing-library/react-native';
import MainScreen from './MainScreen';
import DrawerContent from './MainMenu';

test('Нажатие на баланс в MainScreen вызывает функцию onPress в DrawerContent', () => {
  const mockOnPress = jest.fn(); // Мок функции onPress
  const { getByTestId } = render(<MainScreen />);
  const balanceText = getByTestId('balance-text');
  render(<DrawerContent onPress={mockOnPress} />);
  fireEvent.press(balanceText);
  expect(mockOnPress).toHaveBeenCalled(); // Проверка вызова функции onPress
});
