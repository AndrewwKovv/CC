//Модульное тестирование
import { getCurrentDate } from './IncomeScreen'; // Подключение функции для тестирования

test('Функция getCurrentDate возвращает правильную дату для периода "День"', () => {
  const expectedDate = 'Сегодня'; // Ожидаемый результат для периода "День"
  const currentDate = getCurrentDate('День');
  expect(currentDate).toContain(expectedDate);
});

