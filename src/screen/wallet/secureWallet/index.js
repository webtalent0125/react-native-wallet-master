import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SafeAreaView, Text, View, Image, Pressable, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { GradientButton, SimpleButton } from '../../../components/Buttons';
import { styles } from './styles';
import { Cards, background } from '../../../assets/images';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const SecureWallet = ({ navigation, route }) => {
  const { password } = route.params;
  const { t, i18n } = useTranslation();
  const [skip, setSkip] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const confirmModalRef = useRef();
  const skipModalRef = useRef();
  const snapPoints = useMemo(() => ['70%'], []);
  const snapPoints1 = useMemo(() => ['35%'], []);

  const showConfirmModal = useCallback(() => {
    setopenModal(true);
    confirmModalRef.current?.present();
  }, []);

  const showSkipModal = useCallback(() => {
    setopenModal(true);
    skipModalRef.current?.present();
  }, []);

  const secureAgain = () => {
    skipModalRef.current?.close();
  };

  const secureWallet = () => {
    navigation.navigate('WhatIsIt', { password });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: openModal ? 'black' : '#0B0D2F', opacity: openModal ? 0.8 : 1 },
        ]}
      >
        <ImageBackground source={background} resizeMode='cover' style={{ flex: 1 }}>
          <View style={styles.statusBar}>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon name='chevron-left' fill='white' width={24} height={24} />
            </Pressable>

            <View style={styles.progress}>
              <View style={styles.fill}></View>
            </View>

            <Text style={styles.stepText}>2/3</Text>
          </View>

          <KeyboardAwareScrollView style={{ flex: 1 }}>
            <View style={styles.mainContent}>
              <Text style={styles.title}>{t('common:securewallet')}</Text>
              <Image
                source={Cards}
                style={{ alignSelf: 'center', marginTop: '20%', marginBottom: 10 }}
              />
              <Text style={styles.contentTitle}>Stay Secured</Text>
              <Text style={styles.content}>{t('common:seedphraseinfo1')}</Text>

              {/* <SimpleButton
                customStyle={{ marginTop: 30, marginBottom: 15 }}
                onPress={showConfirmModal}
                text={t('common:remindmelater')}
              ></SimpleButton> */}

              <GradientButton
                customStyle={{ marginBottom: 32, marginTop: 15 }}
                onPress={showConfirmModal}
                text={t('common:start')}
              ></GradientButton>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </SafeAreaView>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={confirmModalRef}
          snapPoints={snapPoints}
          onDismiss={() => setopenModal(false)}
          backgroundStyle={{
            backgroundColor: '#0B0D2F',
          }}
          handleIndicatorStyle={{ backgroundColor: 'white' }}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>What is a 'Seed phrase'</Text>
            <Text style={styles.modalText}>
              A seed phrase is a set of twelve words that contains all the information about your
              wallet, including your funds. It's like a secret code used to access your entire
              wallet. Exzo LLC. and it’s affiliates do not have access to any of this information
              it’s all in your control.
            </Text>
            <Text style={styles.modalText}>
              You must keep your seed phrase secret and safe. If someone gets your seed phrase,
              they'll gain control over your accounts.
            </Text>
            <Text style={styles.modalText}>
              Save it in a place where only you can access it. If you lose it, not even Exzo LLC.
              can help you recover it and Exzo LLC. and it’s affiliates are not responsible for any
              loses.
            </Text>

            <GradientButton
              customStyle={{ marginTop: 16 }}
              text='I Got It'
              onPress={secureWallet}
            ></GradientButton>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={skipModalRef}
          snapPoints={snapPoints1}
          onDismiss={() => setopenModal(false)}
          backgroundStyle={{
            backgroundColor: '#0B0D2F',
          }}
          handleIndicatorStyle={{ backgroundColor: 'white' }}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Skip Account Security?</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <BouncyCheckbox
                size={25}
                fillColor='#013BFF'
                iconStyle={{ borderRadius: 3, borderColor: '#013BFF', height: 20, width: 20 }}
                onPress={(isChecked) => {
                  setSkip(isChecked);
                }}
              />

              <Text style={[styles.modalText, { flex: 1 }]}>
                I understand that if i lose my seed phrase I will not be able to access my wallet
                and can lose all of my funds.
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <SimpleButton text='Secure Now' onPress={secureAgain}></SimpleButton>
              </View>
              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <GradientButton text='Skip' disabled={!skip}></GradientButton>
              </View>
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default SecureWallet;
