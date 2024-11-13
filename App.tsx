import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import "./global.css";

export default function App() {
  return (
    <View className='flex-1 bg-pink-400 justify-center items-center'>
      <Text className='text-2xl text-white font-bold'>Hello World!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
