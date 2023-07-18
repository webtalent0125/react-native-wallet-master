import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, TouchableOpacity, View, Dimensions, Image, Share } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import { CoinType } from '@trustwallet/wallet-core';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { ApplicationProperties } from '../../../ApplicationProperties';
import { styles } from './styles';
import NavigationHeader from '../../../components/navigation';
import { logo } from '../../../assets/images';
import QRCode_Border from '../../../assets/images/svg/qrcode_border.svg';
import LMLoading from '../../../components/common/LMLoading';

const ReceiveToken = (props) => {
  const { coin } = props.route.params;
  const { activeWallet } = useSelector((state) => state.WalletReducer);
  const { user } = useSelector((state) => state.UserReducer);
  const [address, setAddress] = useState(null);

  const copyToClipboard = () => {
    if (activeWallet) {
      Clipboard.setString(address);
      Toast.show({
        type: 'success',
        text2: 'Address copied to clipboard',
      });
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `I'd like to share my wallet address:\n${activeWallet.address}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(async () => {
    if (user) {
      LMLoading.show();
      const backendApiUrl = `${ApplicationProperties.BACKEND_API_URL}crypto/v1/receiveAddress`;
      const params = {
        mnemonics: user.secretRecoveryPhrase,
        coin,
      };
      const { data } = await axios.post(backendApiUrl, params);
      if (data.status) setAddress(data.address);
      LMLoading.hide();
    }
  }, [coin]);

  return (
    <View style={styles.container}>
      <NavigationHeader
        {...props}
        title={`Receive ${CoinType.symbol(CoinType[coin])}`}
      ></NavigationHeader>
      <View style={styles.background}>
        <KeyboardAwareScrollView
          style={{
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
          }}
        >
          <View style={styles.mainContent}>
            {address ? (
              <>
                <View style={styles.wrapper}>
                  <Text style={styles.title}>Scan the QR code to get Receive address</Text>
                  <View style={styles.QRcode}>
                    <QRCode_Border />

                    {activeWallet && (
                      <View style={styles.QRcodeContainer}>
                        <QRCode
                          value={address}
                          logo={logo}
                          size={Dimensions.get('window').width - 200}
                        />
                      </View>
                    )}
                  </View>

                  <View>
                    <View style={styles.divider}></View>
                    <View style={styles.orView}>
                      <Text style={styles.orText}>or</Text>
                    </View>
                  </View>

                  <View style={{ marginTop: 15 }}>
                    <Text style={styles.addressTitle}>
                      Your {CoinType.name(CoinType[coin])} Address:
                    </Text>
                    <View style={styles.addressWrapper}>
                      <Text style={styles.walletAddress} numberOfLines={1}>
                        {address}
                      </Text>
                      <TouchableOpacity onPress={copyToClipboard} style={{ alignSelf: 'center' }}>
                        <View style={styles.copyButton}>
                          <Text style={styles.buttonText}>Copy Address</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.bottomText}>
                    Hold the code inside the frame, it will be scanned automatically
                  </Text>
                </View>

                <TouchableOpacity onPress={onShare}>
                  <View style={styles.shareButton}>
                    <Text style={styles.shareButtonText}>Share Address</Text>
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <></>
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default ReceiveToken;
