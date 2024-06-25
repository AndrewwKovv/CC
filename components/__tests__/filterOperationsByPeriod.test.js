//Модульное тестирование
import { filterOperationsByPeriod } from './IncomeScreen'; // Подключение функции для тестирования

test('Функция filterOperationsByPeriod правильно фильтрует операции для периода "День"', () => {
  const operations = [
    { date: '2024-05-26T12:00:00.000Z' },
    { date: '2024-05-25T12:00:00.000Z' },
  ]; // Операции для тестирования
  const expectedFilteredOperations = [operations[1]]; // Ожидаемый результат для периода "День"
  const filteredOperations = filterOperationsByPeriod(operations, 'День');
  expect(filteredOperations).toEqual(expectedFilteredOperations);
});
