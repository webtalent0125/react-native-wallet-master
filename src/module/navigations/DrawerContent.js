import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking, Pressable } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Icon } from 'react-native-eva-icons';
import {
  logo,
  socialFacebook,
  socialInstagram,
  socialLinkedin,
  socialTwitter,
  socialYoutube,
  mask,
} from '../../assets/images';

export const DrawerContent = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} resizeMode={'stretch'} />
        <Image source={mask} style={styles.banner} />

        <TouchableOpacity
          onPress={() => navigation.navigate('TransactionHistory')}
          style={styles.drawerItem}
        >
          <View style={styles.itemName}>
            <Icon name='clock-outline' fill={'black'} width={22} height={22} />
            <Text style={styles.buttonText}>Transaction History</Text>
          </View>
          <Icon name='chevron-right-outline' fill={'black'} width={22} height={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('MyProfile')}
          style={styles.drawerItem}
        >
          <View style={styles.itemName}>
            <Icon name='person-outline' fill={'black'} width={22} height={22} />
            <Text style={styles.buttonText}>Profile</Text>
          </View>

          <Icon name='chevron-right-outline' fill={'black'} width={22} height={22} />
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('SeedPhrase')}
          style={styles.drawerItem}
        >
          <View style={styles.itemName}>
            <Icon name='shield-outline' fill={'black'} width={22} height={22} />
            <Text style={styles.buttonText}>Privacy & Security</Text>
          </View>

          <Icon name='chevron-right-outline' fill={'black'} width={22} height={22} />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => navigation.navigate('SeedPhrase')}
          style={styles.drawerItem}
        >
          <View style={styles.itemName}>
            <Icon name='file-text-outline' fill={'black'} width={22} height={22} />
            <Text style={styles.buttonText}>Seed Phrase</Text>
          </View>
          <Icon name='chevron-right-outline' fill={'black'} width={22} height={22} />
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('SeedPhrase')}
          style={styles.drawerItem}
        >
          <View style={styles.itemName}>
            <Icon name='wifi-outline' fill={'black'} width={22} height={22} />
            <Text style={styles.buttonText}>Networks</Text>
          </View>
          <Icon name='chevron-right-outline' fill={'black'} width={22} height={22} />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => navigation.navigate('WalletList')}
          style={styles.drawerItem}
        >
          <View style={styles.itemName}>
            <Icon name='shopping-bag-outline' fill={'black'} width={22} height={22} />
            <Text style={styles.buttonText}>Wallets</Text>
          </View>
          <Icon name='chevron-right-outline' fill={'black'} width={22} height={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('TokenList')}
          style={styles.drawerItem}
        >
          <View style={styles.itemName}>
            <Icon name='cube-outline' fill={'black'} width={22} height={22} />
            <Text style={styles.buttonText}>Tokens</Text>
          </View>
          <Icon name='chevron-right-outline' fill={'black'} width={22} height={22} />
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('TokenList')}
          style={styles.drawerItem}
        >
          <View style={styles.itemName}>
            <Icon name='cube-outline' fill={'black'} width={22} height={22} />
            <Text style={styles.buttonText}>Terms and Conditions</Text>
          </View>
          <Icon name='chevron-right-outline' fill={'black'} width={22} height={22} />
        </TouchableOpacity>  */}

        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          }
          style={styles.drawerItem}
        >
          <View style={styles.itemName}>
            <Icon name='log-out-outline' fill={'red'} width={22} height={22} />
            <Text style={[styles.buttonText, { color: 'red' }]}>Logout</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.socialLinks}>
          <Pressable onPress={() => Linking.openURL('https://facebook.com/exzocoin')}>
            <Image source={socialFacebook} style={styles.socialIcon} />
          </Pressable>
          <Pressable onPress={() => Linking.openURL('https://instagram.com/exzocoin')}>
            <Image source={socialInstagram} style={styles.socialIcon} />
          </Pressable>
          <Pressable onPress={() => Linking.openURL('https://linkedin.com/company/exzocoin')}>
            <Image source={socialLinkedin} style={styles.socialIcon} />
          </Pressable>
          <Pressable onPress={() => Linking.openURL('https://twitter.com/exzocoin')}>
            <Image source={socialTwitter} style={styles.socialIcon} />
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL('https://youtube.com/channel/UC9bw5YhCtckVV9EsC1GyQxg')}
          >
            <Image source={socialYoutube} style={styles.socialIcon} />
          </Pressable>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },
  banner: {
    width: '100%',
    height: undefined,
    aspectRatio: 325 / 156,
    marginTop: 10,
    marginBottom: 30,
  },
  drawerItem: {
    marginVertical: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  itemName: {
    flexDirection: 'row',
  },
  buttonText: {
    marginLeft: 5,
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
  },
  socialLinks: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
  },
});
