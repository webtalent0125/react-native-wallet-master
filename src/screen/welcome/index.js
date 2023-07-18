import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LMLoading from '../../components/common/LMLoading';
import { LMStorageConstant } from '../../module/persistent/storage/LMStorageConstant';
import { LMStorageService } from '../../module/persistent/storage/LMStorageService';
import { background, planet } from '../../assets/images/index';
import { styles } from './styles';

const WelcomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    LMLoading.show();
    const UserData = await LMStorageService.getItem(LMStorageConstant.PASSWORD_STORAGE_KEY);
    if (UserData) {
      LMLoading.hide();
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    } else {
      LMLoading.hide();
      setLoading(false);
    }
  }, []);

  const setRootScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthStactNavigator' }],
    });
  };

  return (
    <View style={styles.container}>
      {!loading && (
        <ImageBackground source={background} resizeMode='cover' style={styles.imagebackground}>
          <View style={{ flex: 1 }}>
            <Image source={planet} style={styles.logoImage} />
          </View>
          <View>
            <Text style={styles.title}>Easily Swap, Store, and Discover Crypto</Text>

            <Text style={styles.subTitle}>
              Be in control of your own digital assets today all in one secure wallet.
            </Text>

            <TouchableOpacity style={styles.startButton} onPress={setRootScreen}>
              <LinearGradient
                colors={['#013BFF', '#4F33FE']}
                style={[styles.button]}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
                locations={[0, 1]}
              >
                <Text style={styles.buttonText}>GET STARTED</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

export default WelcomeScreen;
