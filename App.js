import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//Screens
import Login from './views/Login';
import CrearCuenta from './views/CrearCuenta'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
     <NavigationContainer>
       <Stack.Navigator initialRouteName="Login">
         <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Iniciar Sesión",
              headerShown: false
            }}
         />
         <Stack.Screen
            name="CrearCuenta"
            component={CrearCuenta}
            options={{
              title: "Crear Cuenta",
            }}
         />

       </Stack.Navigator>
     </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
