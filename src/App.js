import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import Toast, {
  SuccessToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';
import ApplicationNavigator from './module/navigations/ApplicationNavigator';
import RootStore from './module/redux/RootStore';
import LMLoading from './components/common/LMLoading';
import LMSelect from './components/common/LMSelect';
import './module/constants/IMLocalize';

enableScreens(true);

const toastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      text2Style={{
        fontSize: 15,
        color: '#34384C',
        fontWeight: '700',
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text2Style={{
        fontSize: 15,
        color: '#34384C',
        fontWeight: '700',
      }}
    />
  ),
  info: (props) => (
    <InfoToast
      {...props}
      text2Style={{
        fontSize: 15,
        color: '#34384C',
        fontWeight: '700',
      }}
    />
  ),
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={RootStore}>
      <ApplicationNavigator />
      <Toast
        ref={(ref) => Toast.setRef(ref)}
        config={toastConfig}
        visibilityTime={1000}
      />
      <LMLoading ref={(ref) => LMLoading.setRef(ref)} />
      <LMSelect ref={(ref) => LMSelect.setRef(ref)} />
    </Provider>
  );
};
export default App;
