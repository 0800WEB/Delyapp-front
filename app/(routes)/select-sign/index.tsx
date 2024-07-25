import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectSignScreen from "@/screens/auth/select/select.sign";
import HomeScreen from '@/screens/home/home.screen';

const SelectSign: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const data = await AsyncStorage.getItem('userInfo');
      // console.log(token)
      // console.log(data)
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkToken();
  }, []);
  return isLoggedIn ? <HomeScreen /> : <SelectSignScreen />;
}

export default SelectSign