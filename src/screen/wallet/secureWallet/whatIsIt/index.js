import React from 'react';
import { SafeAreaView, Text, View, Pressable, ImageBackground } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { GradientButton } from '../../../../components/Buttons';
import { background } from '../../../../assets/images';
import { styles } from './styles';

const WhatIsIt = ({ navigation, route }) => {
  const { password } = route.params;

  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.title}>Secure Your Wallet</Text>
            <Text style={styles.subTitle}>
              Secure your wallet's
              <Text style={{ color: '#013BFF', fontWeight: '700' }}> seed phrase</Text>
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
              <Icon name='question-mark-circle-outline' fill='white' width={24} height={24} />
              <Pressable onPress={() => navigation.navigate('WhyImportant')}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#EDF1F9',
                    marginLeft: 10,
                    textDecorationLine: 'underline',
                  }}
                >
                  Why is it important?
                </Text>
              </Pressable>
            </View>

            <View style={styles.contentCard}>
              <Text style={styles.cardText}>
                Write down your seed phrase on a piece of paper or somewhere secure and store in a
                safe place.
              </Text>
              <Text style={styles.cardText}>
                Security Strength:
                <Text style={{ color: '#2B8950', fontWeight: '700' }}> Very strong</Text>
              </Text>
              <View style={styles.strengthBar}>
                <View style={styles.colorBar}></View>
                <View style={styles.colorBar}></View>
                <View style={styles.colorBar}></View>
                <View style={styles.colorBar}></View>
              </View>
              <Text style={styles.listText}>Risks are:</Text>
              <Text style={styles.listText}>{'\u2022'} You lose it</Text>
              <Text style={styles.listText}>{'\u2022'} You forget where you put it</Text>
              <Text style={styles.listText}>{'\u2022'} Someone else finds it</Text>

              <Text style={[styles.cardText, { marginTop: 10 }]}>
                Other options: Doesn't have to be paper!
              </Text>

              <Text style={styles.listText}>Tips:</Text>
              <Text style={styles.listText}>{'\u2022'} Store in bank vault</Text>
              <Text style={styles.listText}>{'\u2022'} Store in a safe</Text>
              <Text style={styles.listText}>{'\u2022'} Store in multiple secret places</Text>
            </View>

            <GradientButton
              customStyle={{ marginBottom: 32, marginTop: 32 }}
              text='Start'
              onPress={() => navigation.navigate('CreateMnemonicsScreen', { password })}
            ></GradientButton>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WhatIsIt;
