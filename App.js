import AppRouter from './src/router/AppRouter';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import 'react-native-gesture-handler'


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRouter />
      </NavigationContainer>
    </Provider >

  );
}

