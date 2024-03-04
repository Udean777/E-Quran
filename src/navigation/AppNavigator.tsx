import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Tafsir from '../screens/Tafsir';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Tafsir"
        component={Tafsir}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
