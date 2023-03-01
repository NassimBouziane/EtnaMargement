import React, { useState } from 'react';
import { View } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Excel from './Excel';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';

export default function Calendrier(props) {
	const [dayChoose, setDayChoose] = useState<any>();
	const [markedDates, setMarkedDates] = useState({});

  const handleDayPress = (day) => {
    setMarkedDates({ [day.dateString]: { color: 'red' } });
    props.onDayPress && props.onDayPress(day);
  };

  return (
		<View>
    <Calendar
      // Initially visible month. Default = now
      minDate={'2023-01-01'}
      maxDate={'2026-01-01'}
      onDayPress={day => {
				handleDayPress(day)
        setDayChoose(day)
      }}
      monthFormat={'yyyy MM'}
      // Hide month navigation arrows. Default = false
      hideExtraDays={true}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
      firstDay={1}
      showWeekNumbers={true}
      onPressArrowLeft={subtractMonth => subtractMonth()}
      onPressArrowRight={addMonth => addMonth()}
      disableAllTouchEventsForDisabledDays={true}
      enableSwipeMonths={true}
      markingType={'period'}
			markedDates={markedDates}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: 'orange',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: 'blue',
        indicatorColor: 'blue',
        textDayFontFamily: 'monospace',
        textMonthFontFamily: 'monospace',
        textDayHeaderFontFamily: 'monospace',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16
      }}
    />
		{ dayChoose && props.component === 'Excel' && <Excel date={dayChoose.dateString} /> }
		{ dayChoose && props.component === 'TonTruc' && <Excel date={dayChoose.dateString} /> }
		</View>
  );
};