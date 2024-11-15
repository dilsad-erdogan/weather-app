import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import "./global.css";
import { CalendarDaysIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { debounce } from 'lodash';
import { fetchLocations, fetchWeatherForecast } from './api/weather';
import { weatherImages } from './constants';

export default function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});

  const handleLocation = (loc) => {
    console.log('location: ', loc);
    setLocations([]);
    fetchWeatherForecast({ cityName: loc.name, days: '7' }).then(data => {
      setWeather(data);
    })
  };

  const handleSearch = (value) => {
    if(value.length > 2) {
      fetchLocations({cityName: value}).then(data => {
        setLocations(data);
      })
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    fetchWeatherForecast({ cityName: 'London', days: '7' }).then(data => {
      setWeather(data);
    })
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {current, location} = weather;

  return (
    <View className='flex-1 relative'>
      <StatusBar style="auto" />

      <Image blurRadius={90} source={require('./assets/backWall.jpg')} className='absolute h-full w-full' />
      
      <SafeAreaView className='flex flex-1'>
        {/* Search Section */}
        <View style={{height: '8%'}} className='mt-14 mx-4 relative z-50'>
          <View className={`flex-row justify-end items-center rounded-full ${showSearch ? 'bg-gray-600' : 'bg-transparent'}`}>
            {showSearch ? (<TextInput onChangeText={handleTextDebounce} placeholder='Search city' placeholderTextColor={'lightgray'} className='pl-6 h-10 flex-1 text-base text-white' />) : null}

            <TouchableOpacity onPress={() => setShowSearch(!showSearch)} className='bg-gray-500 rounded-full p-3 m-1'>
              <MagnifyingGlassIcon size={25} color={"white"} />
            </TouchableOpacity>
          </View>

          {locations.length > 0 && showSearch ? (
            <View className='absolute w-full bg-gray-300 top-16 rounded-3xl'>
              {locations.map((loc, index) => {
                let showBorder = index + 1 !== locations.length;
                let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : '';
                return (
                  <TouchableOpacity onPress={() => handleLocation(loc)} key={index} className={`flex-row items-center border-0 p-3 px-4 mb-1 ${borderClass}`} >
                    <MapPinIcon size={20} color={"gray"} />
                    <Text className='text-black text-lg ml-2'>{loc?.name}, {loc?.country}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>

        {/* Forecast Section */}
        <View className='mx-4 flex justify-around flex-1 mb-2'>
          {/* Location */}
          <Text className='text-white text-center text-2xl font-bold'>
            {location?.name},
            <Text className='text-lg font-semibold text-gray-300'>
              {" " + location?.country}
            </Text>
          </Text>

          {/* Weather Image */}
          <View className='flex-row justify-center'>
            <Image source={weatherImages[current?.condition?.text]} className='w-52 h-52' />
          </View>

          {/* Degree Celcius */}
          <View className='space-y-2'>
            <Text className='text-center font-bold text-white text-6xl ml-5'>
              {current?.temp_c}&#176;
            </Text>

            <Text className='text-center text-white text-xl tracking-widest'>
              {current?.condition?.text}
            </Text>
          </View>

          {/* Other Stats */}
          <View className='flex-row justify-between mx-4'>
            <View className='flex-row space-x-2 items-center'>
              <Image source={require('./assets/drizzle.png')} className='h-6 w-6' />
              <Text className='text-white font-semibold text-base'>{current?.wind_kph}km</Text>
            </View>

            <View className='flex-row space-x-2 items-center'>
              <Image source={require('./assets/rain.png')} className='h-6 w-6' />
              <Text className='text-white font-semibold text-base'>{current?.humidity}%</Text>
            </View>

            <View className='flex-row space-x-2 items-center'>
              <Image source={require('./assets/clear.png')} className='h-6 w-6' />
              <Text className='text-white font-semibold text-base'>6:05 AM</Text>
            </View>
          </View>
        </View>

        {/* Forecast for next days */}
        <View className='mb-2 space-y-3'>
          <View className='flex-row items-center mx-5 space-x-2'>
            <CalendarDaysIcon size={22} color="white" />
            <Text className='text-white text-base'>Daily forecast</Text>
          </View>

          <ScrollView horizontal contentContainerStyle={{paddingHorizontal: 15}} showsHorizontalScrollIndicator={false}>
            {weather?.forecast?.forecastday?.map((item, index) => {
              return (
                <View className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 bg-gray-500'>
                  <Image source={weatherImages[item?.day?.condition?.text]} className='h-11 w-11' />
                  <Text className='text-white'>{item?.date}</Text>
                  <Text className='text-white text-xl font-semibold'>{item?.day?.avgtemp_c}&#176;</Text>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
