import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Cart} from './Cart';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TabThree} from './ThirdTab';
import {Text, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {AddHome} from './AddPage';
import ProductIntoCart from './Components/ProductIntoCart';

const TABICONS: {[key: string]: string} = {
  HomeFeeds: 'home',
  Cart: 'cart-plus',
  TabThree: 'user',
};

const TAB_TITLES: {[key: string]: string} = {
  HomeFeeds: 'Home',
  Cart: 'Add',
  TabThree: 'Three',
};

const s = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    elevation: 0,
  },
  tabBarBox: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 25,
    elevation: 0,
  },
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animating: {
    marginBottom: 5,
    transform: [{rotate: '350deg'}],
  },
});

const TabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={s.tabBarContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const tabColor = isFocused ? '#673ab7' : '#222';

        if (label === 'HomeFeeds') {
          return (
            <View style={s.tabBarBox} key="home">
              <Icon name={TABICONS[label]} color={tabColor} size={24} />
              <Text style={{color: tabColor}}>{TAB_TITLES[label]}</Text>
            </View>
          );
        } else if (label === 'TabThree') {
          return (
            <View style={s.tabBarBox} key="tabThree">
              <Icon name={TABICONS[label]} color={tabColor} size={24} />
              <Text style={{color: tabColor}}>{TAB_TITLES[label]}</Text>
            </View>
          );
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const {
          isAddingToCart = false,
          productImageUri = null,
          setIsAnimating = () => {},
        } = route.params ?? {};

        return (
          <View style={s.tabBarBox} key={label}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={s.tabButton}>
              <Icon
                style={isAddingToCart ? s.animating : {}}
                name={TABICONS[label]}
                color={tabColor}
                size={24}
              />
              <Text style={{color: tabColor}}>{TAB_TITLES[label]}</Text>
            </TouchableOpacity>
            {label === 'Cart' && productImageUri && isAddingToCart && (
              <ProductIntoCart
                imageUri={productImageUri}
                setIsAnimating={setIsAnimating}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

const Tab = createBottomTabNavigator();

const Feed = () => {
  return (
    <Tab.Navigator
      initialRouteName="Cart"
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="HomeFeeds" component={Cart} />
      <Tab.Screen name="Cart" component={AddHome} />
      <Tab.Screen name="TabThree" component={TabThree} />
    </Tab.Navigator>
  );
};

export default Feed;
