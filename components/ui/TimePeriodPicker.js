import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format, startOfWeek, startOfMonth, startOfYear, endOfWeek } from 'date-fns';

const TimePeriodPicker = ({ onSelectPeriod }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(new Date());
  const [customEndDate, setCustomEndDate] = useState(new Date());

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    onSelectPeriod(period);
  };

  const handleConfirmStart = (date) => {
    setCustomStartDate(date);
    setDatePickerVisibility(false);
  };

  const handleConfirmEnd = (date) => {
    setCustomEndDate(date);
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const getCurrentPeriodText = () => {
    const today = new Date();
    switch (selectedPeriod) {
      case 'day':
        return format(today, 'd MMMM');
      case 'week':
        return `${format(startOfWeek(today), 'd MMMM')} - ${format(endOfWeek(today), 'd MMMM')}`;
      case 'month':
        return format(today, 'MMMM yyyy');
      case 'year':
        return format(today, 'yyyy');
      case 'custom':
        return `С ${format(customStartDate, 'd MMMM')} по ${format(customEndDate, 'd MMMM, yyyy')}`;
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
  style={[styles.button, selectedPeriod === 'day' ? styles.activeButton : null]} 
  onPress={() => handlePeriodChange('day')}
>
  <Text style={[styles.buttonText, selectedPeriod === 'day' ? { color: '#007AFF' } : null]}>День</Text>
</TouchableOpacity>
<TouchableOpacity 
  style={[styles.button, selectedPeriod === 'week' ? styles.activeButton : null]} 
  onPress={() => handlePeriodChange('week')}
>
  <Text style={[styles.buttonText, selectedPeriod === 'week' ? { color: '#007AFF' } : null]}>Неделя</Text>
</TouchableOpacity>
<TouchableOpacity 
  style={[styles.button, selectedPeriod === 'month' ? styles.activeButton : null]} 
  onPress={() => handlePeriodChange('month')}
>
  <Text style={[styles.buttonText, selectedPeriod === 'month' ? { color: '#007AFF' } : null]}>Месяц</Text>
</TouchableOpacity>
<TouchableOpacity 
  style={[styles.button, selectedPeriod === 'year' ? styles.activeButton : null]} 
  onPress={() => handlePeriodChange('year')}
>
  <Text style={[styles.buttonText, selectedPeriod === 'year' ? { color: '#007AFF' } : null]}>Год</Text>
</TouchableOpacity>
<TouchableOpacity 
  style={[styles.button, selectedPeriod === 'custom' ? styles.activeButton : null]} 
  onPress={() => { handlePeriodChange('custom'); showDatePicker(); }}
>
  <Text style={[styles.buttonText, selectedPeriod === 'custom' ? { color: '#007AFF' } : null]}>Период</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    borderRadius: 5,
    paddingHorizontal: 3,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});


export default TimePeriodPicker;