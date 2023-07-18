import React from 'react';
import { SafeAreaView, Text, View, Pressable, Image, ImageBackground } from 'react-native';
import { GradientButton } from '../../../components/Buttons';
import { heart, background, logo } from '../../../assets/images';
import { styles } from './styles';

const Conguratulations = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} resizeMode='cover' style={styles.mainContent}>
        <Image source={logo} style={styles.logoIcon} />
        <Text style={styles.title}>Congratulations</Text>
        <Text style={styles.content}>
          You've successfully protected your wallet. Remember to keep your seed phrase safe, it's
          your responsibility Exzo LLC. and it’s affiliates cannot retrieve it for you and are not
          responsible for losses or damages.
        </Text>
        <Pressable onPress={() => navigation.navigate('LearnMore')}>
          <Text style={[styles.link, { marginBottom: 25 }]}>Leave yourself a hint?</Text>
        </Pressable>
        <Text style={styles.content}>
          Exzo cannot recover your wallet should you lose it. You can find your seed phrase in
        </Text>
        <Text style={[styles.content, { fontWeight: '700' }]}>
          Setting &gt; Security &amp; Privacy
        </Text>
        <Pressable onPress={() => navigation.navigate('LearnMore')}>
          <Text style={[styles.link, { marginBottom: 20 }]}>Learn more</Text>
        </Pressable>

        <GradientButton
          customStyle={{ marginBottom: 32 }}
          text='Continue'
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'MainStackNavigator' }],
            })
          }
        ></GradientButton>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Conguratulations;
