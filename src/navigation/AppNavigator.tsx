import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Detail from '../screens/Detail';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleAlign: 'center',
          headerTitle: "Kumpulan Surah",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333'
          }
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333'
          }
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
