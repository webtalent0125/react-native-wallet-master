import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import NavigationHeader from '../navigation';

const WhyImportant = (props) => {
  return (
    <View style={styles.container}>
      <NavigationHeader {...props} />
      <ScrollView style={styles.mainContent}>
        <Text style={styles.h2}>What is a seed phrase?</Text>
        <Text style={styles.contentText}>
          The seed phrase is a list of random words (12 or 18 or 24 in number) used to recover your
          funds in case you lose your wallet’s password or the device where your wallet is
          installed. It also comes in handy when your wallet is not functional.
        </Text>
        <Text style={styles.contentText}>
          The seed phrase is also called recovery key, seed key, and recovery seed.
        </Text>
        <Text style={styles.contentText}>
          A seed phrase is usually generated when setting up your crypto wallet. Therefore, it is
          important you don’t skip this step. Backup systems always come in handy when looking to
          salvage a dire situation.
        </Text>
        <Text style={styles.contentText}>
          Once you have access to your seed phrase, taking a pen and a paper and physically writing
          it down is the next best step. Memorizing the phrase is not a viable option. Also, never
          store your seed phrase on platforms that can easily be hacked like Evernote or iOS Notes.
        </Text>
        <Text style={styles.contentText}>
          Just like your private key, your seed phrase can give anyone who has it access and control
          over your funds. That said, your seed-phrase security is as important as private key
          security. So, how do you keep them safe?
        </Text>
        <Text style={styles.h2}>Why is it important?</Text>
        <Text style={styles.contentText}>
          By now, it is clear that your private key plays an important role when it comes to the
          safety of your digital coins. Therefore, the information must always be safe and away from
          everyone else but you. You already have some ideas of how you can safely store your
          private keys.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 15,
  },
  contentText: {
    fontSize: 16,
    marginVertical: 5,
    lineHeight: 24,
  },
});

export default WhyImportant;
