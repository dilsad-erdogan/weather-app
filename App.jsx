import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import "./global.css";
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { useState } from 'react';

export default function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([1,2,3]);

  const handleLocation = (loc) => {
    console.log('location: ', loc);
  }

  return (
    <View className='flex-1 relative'>
      <StatusBar style="auto" />

      <Image blurRadius={90} source={require('./assets/backWall.jpg')} className='absolute h-full w-full' />
      
      <SafeAreaView className='flex flex-1'>
        {/* Search Section */}
        <View style={{height: '8%'}} className='mt-14 mx-4 relative z-50'>
          <View className={`flex-row justify-end items-center rounded-full ${showSearch ? 'bg-gray-600' : 'bg-transparent'}`}>
            {showSearch ? (<TextInput placeholder='Search city' placeholderTextColor={'lightgray'} className='pl-6 h-10 flex-1 text-base text-white' />) : null}

            <TouchableOpacity onPress={() => setShowSearch(!showSearch)} className='bg-gray-500 rounded-full p-3 m-1'>
              <MagnifyingGlassIcon size={25} color={"white"} />
            </TouchableOpacity>
          </View>

          {locations.length > 0 && showSearch ? (
            <View className='absolute w-full bg-gray-300 top-16 rounded-3xl'>
              {locations.map((loc, index) => {
                let showBorder = index+1 !== locations.length;
                let borderClass = showBorder ? 'border-b-2 border-b-gray-400' : '';
                return (
                  <TouchableOpacity onPress={() => handleLocation(loc)} key={index} className={"flex-row items-center border-0 p-3 px-4 mb-1" + borderClass}>
                    <MapPinIcon size={20} color={"gray"} />
                    <Text className='text-black text-lg ml-2'>London</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          ) : null}
        </View>

        {/* Forecast Section */}
        <View className='mx-4 flex justify-around flex-1 mb-2'>
          {/* Location */}
          <Text className='text-white text-center text-2xl font-bold'>
            London,
            <Text className='text-lg font-semibold text-gray-300'>
              United Kingdom
            </Text>
          </Text>

          {/* Weather Image */}
          <View className='flex-row justify-center'>
            <Image source={require('./assets/cloud.png')} className='w-52 h-52' />
          </View>

          {/* Degree Celcius */}
          <View className='space-y-2'>
            <Text className='text-center font-bold text-white text-6xl ml-5'>
              23&#176;
            </Text>

            <Text className='text-center text-white text-xl tracking-widest'>
              Partly Cloud
            </Text>
          </View>

          {/* Other Stats */}
          <View></View>
        </View>
      </SafeAreaView>
    </View>
  );
}
