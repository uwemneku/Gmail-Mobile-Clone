import Constants from 'expo-constants';
import React, { useEffect } from 'react';
import { BackHandler, SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './store';
import RootNavigator from './Navigation/RootNavigator';
import DrawerNavigation from './Navigation/DrawerNavigation';
import AccountsModal from './componenets/AccountsModal';

export default function App() {

  useEffect(() => {
    const backAction = () => {
      // setIsSelected(false)
      
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
          <SafeAreaView style={styles.container}  > 
            <DrawerNavigation />
          </SafeAreaView>
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
