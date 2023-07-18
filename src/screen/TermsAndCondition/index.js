import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Linking, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import NavigationHeader from '../../components/navigation/index';

const TermsAndCondition = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader navigation={navigation}></NavigationHeader>
      <KeyboardAwareScrollView>
        <View style={styles.mainContent}>
          <Text style={styles.h2}>Who we are</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.content}>Our website address is: </Text>
            <Pressable onPress={() => Linking.openURL('https://exzocoin.com/')}>
              <Text style={styles.link}>https://exzocoin.com</Text>
            </Pressable>
          </View>
          <Text style={styles.h3}>Terms of use:</Text>
          <Text style={styles.content}>
            ExzoCoin 2.0 (EXZO) is a Utility token utilized in EXZO LLC. crowdfunding campaign to
            raise funding to build out our platforms and services. ExzoCoin 2.0 (EXZO) will be
            utilized as a loyalty reward token for early supporters of our project to enable them to
            be the first individuals to utilize our platforms and services.
          </Text>
          <Text></Text>
          <Text style={styles.content}>
            Purchasing of ExzoCoin (EXZO) and/or ExzoCoin 2.0 (EXZO):
          </Text>
          <Text style={styles.content}>
            Individuals’ who have participated in Exzo LLC. a crowdfunding campaign(s) are not
            entitled to a refund for their utility tokens. EXZO LLC. has the right to reject refund
            offers due to the volatility in the cryptocurrency market that can lead to disruption of
            their crowdfunding campaign and they are not reliable or held responsible for
            individuals falling victim to individuals impersonating them for malicious matters or
            for losses induced from being scammed. Individuals are required to ensure the EXZO LLC.
            team members they associate and interact with are legitimate.
          </Text>
          <Text></Text>
          <Text style={styles.h2}>Disclaimer:</Text>
          <Text style={styles.h3}>No Investment Advice</Text>
          <Text style={styles.content}>
            The information provided on this website does not constitute investment advice,
            financial advice, trading advice, or any other sort of advice and you should not treat
            any of the website’s content as such. CoinMarketCap does not recommend that any
            cryptocurrency should be bought, sold, or held by you. Do conduct your own due diligence
            and consult your financial advisor before making any investment decisions.
          </Text>
          <Text style={styles.h3}>Accuracy of Information</Text>
          <Text style={styles.content}>
            CoinMarketCap will strive to ensure accuracy of information listed on this website
            although it will not hold any responsibility for any missing or wrong information.
            CoinMarketCap provides all information as is. You understand that you are using any and
            all information available here at your own risk.
          </Text>
          <Text style={styles.h3}>Non Endorsement</Text>
          <Text style={styles.content}>
            The appearance of third party advertisements and hyperlinks on CoinMarketCap does not
            constitute an endorsement, guarantee, warranty, or recommendation by CoinMarketCap. Do
            conduct your own due diligence before deciding to use any third party services.
          </Text>
          <Text style={styles.h3}>Affiliate Disclosure</Text>
          <Text style={styles.content}>
            Exzo LLC may receive compensation for affiliate links. This compensation may be in the
            form of money or services and could exist without any action from a site visitor. Should
            you perform activities in relation to an affiliate link, it is understood that some form
            of compensation might be made to Exzo. For example, if you click on an affiliate link,
            and sign up and trade on an exchange, CoinMarketCap may receive compensation. Each
            affiliate link is clearly marked with an icon next to it.
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewStyle: {
    flex: 1,
  },
  containerStyle: {
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
  },
  content: {
    fontSize: 16,
    textAlign: 'justify',
  },
  h3: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 20,
  },
  link: {
    color: '#0066FF',
    fontWeight: '500',
  },
});

export default TermsAndCondition;
