import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function StartScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const newScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(newScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        })
      ]),
      Animated.delay(3500),
    ]).start(() => {
      router.push('/(routes)/adult-disclaimer');
    });
  }, []);

  return (
    <LinearGradient
      colors={["#000024", "#000024"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Animated.View style={[styles.imageContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={require("@/assets/images/pngs/CHARRO_NEGRO-07.png")} />
      </Animated.View>
      <Animated.View style={[styles.fullscreenContainer, { opacity: opacityAnim }]}>
        <Image style={styles.fullscreenImage} source={require("@/assets/images/img-01.jpg")} />
      </Animated.View>
      <Animated.View style={[styles.imageContainer, {transform: [{scale: 1}]},{ opacity: opacityAnim }]}>
        <Image source={require("@/assets/images/ICONOS-76.png")} />
      </Animated.View>
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  centeredImage: {
    width: 200,
    height: 200,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});