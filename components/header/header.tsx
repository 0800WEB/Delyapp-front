import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {SimpleLineIcons} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _retrieveData } from "@/utils/util";
import { UserInfo } from '../../store/user/userReducer';
import { RootState } from "@/store/store";

interface HeaderProps {
  openDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ openDrawer }) => {
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [fontsLoaded, fontError] = useFonts({
    'Cherione Bold': require('../../assets/fonts/Cherione Bold.ttf'),
    'Cherione Regular': require('../../assets/fonts/Cherione.otf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    if (userInfo) {
      setUserData(userInfo);
    }
  }, [userInfo]);

  return (
    <View style={styles.headerStyle}>
      <TouchableOpacity onPress={openDrawer}>
        <SimpleLineIcons
          name="menu"
          size={24}
          color="white"
          style={{ alignSelf: 'center' }}
        />
      </TouchableOpacity>
      {userData && (
        <Text style={styles.userText}>{userData.name}</Text>
      )}
      <Image
        source={require('@/assets/images/ICONOS-01.png')}
        style={styles.profilePhoto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    backgroundColor: '#000024',
  },
  userText: {
    fontFamily: 'Cherione Regular',
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  profilePhoto: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    alignSelf: 'center',
  },
});

export default Header;