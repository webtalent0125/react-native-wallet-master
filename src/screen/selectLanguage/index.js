import React from 'react';
import { View, Text, Pressable, SafeAreaView, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import { background } from '../../assets/images';
import { styles } from './styles';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'cn', label: '汉语' },
  { code: 'fr', label: 'French' },
];

const SelectLanguage = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = (code) => {
    i18n.changeLanguage(code);
    navigation.navigate('WalletStartPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} resizeMode='cover' style={styles.imagebackground}>
        <View style={styles.mainContent}>
          <Text style={styles.title}>{t('common:chooseyourlanguage')}</Text>
          <KeyboardAwareScrollView>
            {LANGUAGES.map((language, index) => {
              const selectedLanguage = language.code === selectedLanguageCode;

              return (
                <Pressable
                  key={index}
                  style={styles.languageItem}
                  onPress={() => setLanguage(language.code)}
                >
                  <Text style={[selectedLanguage ? styles.selectedText : styles.text]}>
                    {language.label}
                  </Text>
                  <Icon name='chevron-right' fill='white' width={34} height={34} />
                </Pressable>
              );
            })}
          </KeyboardAwareScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SelectLanguage;
