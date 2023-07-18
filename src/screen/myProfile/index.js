import React from 'react';
import { useSelector } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Share,
} from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-eva-icons';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import NavigationHeader from '../../components/navigation';
import BannerSlider from '../../components/bannerSlider';
import { logo } from '../../assets/images';
import ProfileSecurity from '../../assets/images/svg/profile_security.svg';
import ProfileReferral from '../../assets/images/svg/profile_referral.svg';
import { styles } from './styles';

const MyProfile = (props) => {
  const { navigation } = props;
  const { activeWallet } = useSelector((state) => state.WalletReducer);

  const copyToClipboard = () => {
    if (activeWallet) {
      Clipboard.setString(activeWallet.address);
      Toast.show({
        type: 'info',
        text2: 'Address copied to clipboard',
      });
    }
  };

  return (
    <View style={styles.container}>
      <NavigationHeader {...props} title="My profile"></NavigationHeader>
      <View style={styles.background}>
        <KeyboardAwareScrollView
          style={{ flex: 1, borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        >
          <View style={styles.mainContent}>
            {activeWallet.address && (
              <View style={styles.walletDetail}>
                <Image source={logo} style={styles.exzoLogo} />
                <View>
                  <Text>
                    {activeWallet.name ? activeWallet.name : 'No name'}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text>
                      {activeWallet.address.substring(0, 15)}...
                      {activeWallet.address.substring(
                        activeWallet.address.length - 5
                      )}
                    </Text>
                    <TouchableOpacity onPress={copyToClipboard}>
                      <Icon
                        name="copy-outline"
                        fill="black"
                        width={20}
                        height={20}
                        style={{ marginLeft: 7 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

            <BannerSlider />

            <View style={styles.profileOptions}>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => navigation.navigate('Security')}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ProfileSecurity width={48} height={48} />
                  <Text style={styles.itemText}>Security</Text>
                </View>
                <Icon
                  name="chevron-right-outline"
                  width={30}
                  height={30}
                  fill="black"
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.listItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ProfileReferral width={48} height={48} />
                  <Text style={styles.itemText}>Referral</Text>
                </View>
                <Icon
                  name="chevron-right-outline"
                  width={30}
                  height={30}
                  fill="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default MyProfile;
