import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import { Icon } from 'react-native-eva-icons';

const NavigationHeader = ({ navigation, ...props }) => {
  const { title, color, drawer, search, bell, bgColor, share, close, modal } =
    props;
  const { articleData } = props?.route?.params ? props?.route?.params : {};
  const { image_url } = articleData ? articleData : {};
  const image = { uri: image_url };

  const Content = () => {
    return (
      <View style={styles.navbar}>
        {drawer ? (
          <TouchableOpacity
            style={styles.navbarStyle}
            onPress={() => navigation.toggleDrawer()}
          >
            <Icon
              name="menu-outline"
              fill={color ? color : 'white'}
              width={26}
              height={26}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.navbarStyle}
            onPress={() => (navigation ? navigation.goBack() : close())}
          >
            <Icon
              name="arrow-back"
              fill={color ? color : 'white'}
              width={30}
              height={30}
            />
          </TouchableOpacity>
        )}
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        {(search || bell) && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            {search && (
              <Icon
                name="search-outline"
                fill={color ? color : 'white'}
                width={20}
                height={20}
                style={{ marginRight: 25 }}
              />
            )}
            {bell && (
              <Icon
                name="bell"
                fill={color ? color : 'white'}
                width={20}
                height={20}
                style={{ marginRight: 5 }}
              />
            )}
          </View>
        )}
        {share && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            {share && (
              <Icon
                name="share"
                fill={color ? color : 'white'}
                width={21}
                height={23}
                style={{ marginRight: 25 }}
              />
            )}
          </View>
        )}
        {modal && (
          <TouchableOpacity
            onPress={() => navigation.navigate('ImportWallet')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              zIndex: 11,
            }}
          >
            {modal && (
              <Icon
                name="plus-circle-outline"
                fill={color ? color : 'white'}
                width={24}
                height={24}
                style={{ marginRight: 25 }}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (image.uri) {
    return (
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={[styles.background, styles.backgroundImage]}
      >
        <Content />
      </ImageBackground>
    );
  } else {
    return (
      <View
        style={[
          styles.background,
          {
            backgroundColor: bgColor ? bgColor : '#3755F0',
          },
        ]}
      >
        <Content />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#3755F0',
    zIndex: 10,
  },
  backgroundImage: {
    paddingBottom: 150,
  },
  navbar: {
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    marginBottom: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarStyle: {
    zIndex: 11,
    marginStart: 15,
  },
  title: {
    position: 'absolute',
    top: 2,
    width: '100%',
    textAlign: 'center',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
});

export default NavigationHeader;
