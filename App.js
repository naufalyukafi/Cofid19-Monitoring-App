import * as React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './screens/Login';
import Dashboard from './screens/Dashboard';
import Profile from './screens/Profil';
import About from './screens/About';
import DetailLocation from './screens/DetailLocation';
import DetailAds from './screens/DetailAds';
import Intro from './screens/Intro';

import Icon from 'react-native-vector-icons/Ionicons';
import * as theme from './theme'

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import rootReducer from './reducers'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const Drawwing = () => (
  <Drawer.Navigator initialRouteName="Dashboard" >
    <Drawer.Screen name='Dashboard' component={Dashboard} />
    <Drawer.Screen name='Profile' component={Profile} />
    <Drawer.Screen name='About' component={About} />
  </Drawer.Navigator>
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Intro" screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.active
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
          }} >
            <Stack.Screen name='Intro' component={Intro} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Dashboard' component={Drawwing} options={{ title: 'Covid Monitoring' }} />
            <Stack.Screen name='DetailLocation' component={DetailLocation} options={{ title: 'Detail Location' }} />
            <Stack.Screen name='DetailAds' component={DetailAds} options={{ title: 'Detail Advertisement' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}