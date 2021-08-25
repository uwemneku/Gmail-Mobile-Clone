import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './store';
import RootNavigator from './Navigation/RootNavigator';
import DrawerNavigation from './Navigation/DrawerNavigation';
import AccountsModal from './componenets/AccountsModal';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container} >
          {/* <RootNavigator /> */}
          <DrawerNavigation />
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    height:'100%',
    flex: 1
  },
});
