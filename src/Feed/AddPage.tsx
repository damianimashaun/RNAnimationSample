import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PRODUCT_IMAGE = 'https://picsum.photos/id/237/200/300';

const getBackgroundColor = (state: boolean) =>
  state
    ? {backgroundColor: 'rgba(255, 255, 255, 0.7)'}
    : {backgroundColor: 'rgba(0, 0, 0, 0.7)'};

const getTextColor = (state: boolean) =>
  state ? {color: '#000'} : {color: '#fff'};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  addItemContainer: {
    flex: 0,
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    minHeight: 10,
    width: '90%',
    bottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  imageBox: {
    width: 70,
    height: 70,
    marginLeft: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  detailBox: {
    paddingLeft: 10,
    paddingTop: 5,
    flex: 1,
  },
  detailHeader: {
    color: '#fff',
    fontWeight: '800',
    paddingBottom: 5,
  },
  detailSubtitle: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#eb347a',
    marginRight: 10,
    justifyContent: 'center',
    height: 70,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  addText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  tickBox: {
    backgroundColor: 'rgba(52, 235, 134, 0.7)',
    height: 70,
    position: 'absolute',
    top: 0,
    width: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AddHome = () => {
  const [isAddingToCart, setAddingToCart] = useState(false);
  const [] = useState(0);

  const {params} = useRoute();
  const {setParams} = useNavigation();

  const additionalTextStyles = getTextColor(isAddingToCart);

  useEffect(() => {
    setParams({productImageUri: PRODUCT_IMAGE, isAddingToCart});
  }, [isAddingToCart, setParams]);
  console.log({params});

  const onAddToCart = () => {
    setAddingToCart(true);
    setTimeout(() => {
      setAddingToCart(false);
    }, 500);
  };

  return (
    <View style={s.container}>
      <View style={[s.addItemContainer, getBackgroundColor(isAddingToCart)]}>
        <View style={s.imageBox}>
          <Image
            source={{uri: PRODUCT_IMAGE}}
            style={s.image}
            resizeMethod="auto"
          />
          {isAddingToCart && (
            <View style={s.tickBox}>
              <Icon name="check" color="#fff" size={24} />
            </View>
          )}
        </View>
        <View style={s.detailBox}>
          <Text style={[s.detailHeader, additionalTextStyles]}>$140</Text>
          <Text style={[s.detailHeader, additionalTextStyles]}>
            #Eau de parfum
          </Text>
          <Text style={[s.detailSubtitle, additionalTextStyles]}>
            Top Notes: Bergamot...
          </Text>
        </View>
        {!isAddingToCart && (
          <TouchableOpacity style={s.addButton} onPress={onAddToCart}>
            <Text style={s.addText}>{'ADD TO \nCART'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export {AddHome};
