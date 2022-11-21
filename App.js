import 'react-native-gesture-handler'
import AppRouter from './src/router/AppRouter';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import { MenuProvider } from 'react-native-popup-menu';
import { store } from "./src/store/store";


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MenuProvider>
          <AppRouter />
        </MenuProvider>
      </NavigationContainer>
    </Provider >

  );
}

