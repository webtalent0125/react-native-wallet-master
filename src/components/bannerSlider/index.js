import React, { useState } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { banner1, banner2, banner3 } from '../../assets/images';
import { styles } from './styles';

const BannerSlider = () => {
  const [banners, setBanners] = useState([1, 2, 3]);
  const { height, width } = Dimensions.get('window');

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        {item === 1 && <Image source={banner1} style={styles.bannerImage}></Image>}
        {item === 2 && <Image source={banner2} style={styles.bannerImage}></Image>}
        {item === 3 && <Image source={banner3} style={styles.bannerImage}></Image>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={banners}
        autoplay={true}
        loop={true}
        renderItem={renderItem}
        sliderWidth={width - 30}
        itemWidth={width - 30}
      />
    </View>
  );
};

export default BannerSlider;
