import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectSignScreen from "@/screens/auth/select/select.sign";
import HomeScreen from '@/screens/home/home.screen';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import DrawerLayoutNav from '../drawer';

const SelectSign: React.FC = () => {
  const userToken = useSelector((state: RootState) => state.user.token);

  return userToken ? <DrawerLayoutNav /> : <SelectSignScreen />;
  // return <SelectSignScreen />;
}

export default SelectSign