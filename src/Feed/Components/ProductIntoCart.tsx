import React, {useRef, useEffect} from 'react';
import {Animated, Image, StyleSheet, View} from 'react-native';

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -40,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
  },
  image: {
    width: 15,
    height: 15,
    borderRadius: 30,
  },
});

type TProductIntoCart = {
  availableHeight?: number;
  imageUri: string;
  setIsAnimating?: (v: boolean) => void;
};

const ProductIntoCart = ({imageUri}: TProductIntoCart) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  console.log({xxx: imageUri});

  return (
    <View
      style={s.container}
      onLayout={event => console.log({abc: event.nativeEvent.layout})}>
      <Animated.View
        style={{
          ...s.animationContainer,
          opacity: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [25, -20],
              }),
            },
          ],
        }}>
        <View style={s.imageContainer}>
          <Image source={{uri: imageUri}} style={s.image} />
        </View>
      </Animated.View>
    </View>
  );
};

export default ProductIntoCart;
