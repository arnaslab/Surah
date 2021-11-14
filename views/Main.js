import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import navigation from './navigation';

const Stack = createStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {navigation.map((item, key) => (
          <Stack.Screen
            key={key}
            name={item.name}
            component={item.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;