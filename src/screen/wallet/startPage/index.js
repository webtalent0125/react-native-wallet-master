import React from 'react';
import { SafeAreaView, Text, View, Image, Platform, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import { GradientButton, SimpleButton } from '../../../components/Buttons';
import { walletsetup, background } from '../../../assets/images/index';
import { styles } from './styles';

const StartPage = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} resizeMode='cover' style={styles.mainContent}>
        <View style={{ flex: 1 }}>
          <Image source={walletsetup} style={styles.image}></Image>
          <Text style={styles.title}>{t('common:walletSetup')}</Text>
          <Text style={styles.contentText}>{t('common:walletimportorcreate')}</Text>
        </View>

        <View>
          <SimpleButton onPress={() => navigation.navigate('ImportWallet')} text={t('common:importusingseedphrase')}></SimpleButton>

          <GradientButton
            customStyle={{ marginBottom: Platform.OS === 'ios' ? 50 : 40, marginTop: 20 }}
            onPress={() => navigation.navigate('WalletCreatePassword')}
            text={t('common:createnewwallet')}
          ></GradientButton>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default StartPage;
