import AsyncStorage from '@react-native-async-storage/async-storage'; // Импорт AsyncStorage для работы с хранилищем данных
import categoriesData from './categories.json'; // Импорт данных категорий из JSON файла

// Функция для загрузки категорий из AsyncStorage
export const loadCategories = async () => {
  try {
    // Пытаемся загрузить категории из хранилища данных
    const storedCategories = await AsyncStorage.getItem('categories');
    if (storedCategories) {
      // Если категории есть в хранилище, возвращаем их в виде объекта JavaScript
      return JSON.parse(storedCategories);
    } else {
      // Если категорий нет в хранилище, сохраняем данные категорий из JSON файла в хранилище и возвращаем их
      await AsyncStorage.setItem('categories', JSON.stringify(categoriesData));
      return categoriesData;
    }
  } catch (error) {
    // Если произошла ошибка при загрузке категорий, выводим сообщение об ошибке и возвращаем данные категорий из JSON файла
    console.error('Error loading categories:', error);
    return categoriesData;
  }
};
//Этот код загружает категории из AsyncStorage. Если категории уже есть в хранилище, они загружаются и возвращаются в виде объекта JavaScript. Если категорий нет в хранилище, данные категорий из JSON файла сохраняются в хранилище и затем возвращаются. Если произойдет ошибка при загрузке категорий, будет выведено сообщение об ошибке, и будут возвращены данные категорий из JSON файла.