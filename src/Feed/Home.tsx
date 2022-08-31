import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  addItemContainer: {
    paddingHorizontal: 10,
    borderColor: '#000',
    borderWidth: 1,
    minHeight: 10,
    flex: 0,
    position: 'absolute',
    width: '90%',
    bottom: 10,
    alignSelf: 'center',
  },
});

const FeedHome = () => {
  return (
    <View style={s.container}>
      <View style={s.addItemContainer}>
        <Text>boxxxx</Text>
      </View>
    </View>
  );
};

export {FeedHome};
