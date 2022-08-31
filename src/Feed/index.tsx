import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Cart} from './Cart';
import {FeedHome} from './Home';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const screenOptions = (route: any, color: string) => {
  let iconName: string = 'home';

  if (route.name === 'Cart') {
    iconName = 'cart-plus';
  }

  return <Icon name={iconName} color={color} size={24} />;
};

const Feed = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => screenOptions(route, color),
      })}>
      <Tab.Screen name="FeedHome" component={FeedHome} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
};

export default Feed;
