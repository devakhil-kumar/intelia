import 'react-native-reanimated';

import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './src/navigation/AuthNavigator'
import { ThemeProvider } from './src/contexts/ThemeContext'
import { Provider, useDispatch, useSelector } from "react-redux";
import store from './src/app/store';
import {hideMessage} from './src/app/features/messageSlice';
import RootNavigator from './src/navigation/RootNavigator';
import CustomMessage from './src/components/CustomMessage';



const GlobalMessageWrapper = () => {
  const { visible, text, type } = useSelector(state => state.message);
  const dispatch = useDispatch();

  return (
    <>
      <RootNavigator />
      <CustomMessage
        visible={visible}
        text={text}
        type={type}
        onHide={() => dispatch(hideMessage())}
      />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <GlobalMessageWrapper />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
   
  )
}


export default App;

