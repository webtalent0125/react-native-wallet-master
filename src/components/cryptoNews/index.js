import React, { useState, useEffect } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ApplicationProperties } from '../../ApplicationProperties';
import { styles } from './styles';

const CryptoNews = (props) => {
  const { navigation } = props;
  const [newsData, setNewsData] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await axios.get(
        `https://cryptonews-api.com/api/v1/category?section=general&items=5&token=${ApplicationProperties.CRYPTONEWS_API_KEY}`
      );
      setNewsData(data.data);
    } catch (error) {
      setNewsData([
        {
          news_url:
            'https://u.today/shib-comes-to-mercado-bitcoin-sundaeswap-to-launch-testnet-soon-healthcare-company-adds-shib-to-its',
          image_url: 'https://crypto.snapi.dev/images/v1/1/1/11002-85513.jpg',
          title:
            'SHIB Comes to Mercado Bitcoin, SundaeSwap to Launch Testnet Soon, Healthcare Company Adds SHIB to Its Balance Sheet: Crypto News Digest by U.Today',
          text: "Read U.Today's daily news digest to stay updated on crypto industry events!",
          source_name: 'UToday',
          date: 'Thu, 02 Dec 2021 10:03:00 -0500',
          topics: [],
          sentiment: 'Positive',
          type: 'Article',
        },
        {
          news_url:
            'https://news.bitcoin.com/leading-supermarket-chain-in-croatia-introduces-crypto-payments/',
          image_url:
            'https://crypto.snapi.dev/images/v1/e/d/shutterstock-390523339-85508.jpg',
          title:
            'Leading Supermarket Chain in Croatia Introduces Crypto Payments',
          text: "Customers of the largest supermarket chain in Croatia will be able to pay with cryptocurrency for their orders in the retailer's online shop. The company plans to soon offer the crypto payment option also at its physical stores throughout the country. Konzum Allows Shoppers in Croatia to Pay With 9 Cryptocurrencies Croatia's supermarket chain with [\u2026]",
          source_name: 'Bitcoin',
          date: 'Thu, 02 Dec 2021 10:00:53 -0500',
          topics: [],
          sentiment: 'Positive',
          type: 'Article',
        },
        {
          news_url:
            'https://cryptodaily.co.uk/2021/12/crypto-ads-under-the-microscope-in-india',
          image_url:
            'https://crypto.snapi.dev/images/v1/o/g/india-crypto-ad-85515.jpg',
          title: 'Crypto Ads Under The Microscope In India',
          text: 'The Advertising Standards Council of India (ASCI) is in discussions with the government to tighten the guidelines governing crypto advertisements, to minimize customer risk.\u00a0 Crypto Ads Facing The Fire The marketing efforts of leading crypto exchanges in India like CoinDCX, WazirX, CoinSwitch Kuber, Zebpay, have not gone unnoticed.',
          source_name: 'Crypto Daily',
          date: 'Thu, 02 Dec 2021 10:00:00 -0500',
          topics: [],
          sentiment: 'Neutral',
          type: 'Article',
        },
        {
          news_url:
            'https://markets.businessinsider.com/news/currencies/facebook-crypto-advertising-policy-change-regulatory-licenses-meta-platform-2021-12',
          image_url:
            'https://crypto.snapi.dev/images/v1/2/r/618afecd23745d001825ca14formatjpeg-85509.jpg',
          title:
            'Facebook is making it easier for crypto firms to run ads on its platform in a reversal of previous policies',
          text: "The move is the latest update to the company's crypto policies, which have oscillated as the sector has grown in the past several years.",
          source_name: 'Business Insider',
          date: 'Thu, 02 Dec 2021 09:59:00 -0500',
          topics: [],
          sentiment: 'Positive',
          type: 'Article',
        },
        {
          news_url:
            'https://cryptobriefing.com/facebook-reverses-crypto-ad-ban/?utm_source=main_feed&utm_medium=rss',
          image_url:
            'https://crypto.snapi.dev/images/v1/8/p/facebook-meta-ads-cover-838x440-85500.png',
          title: 'Facebook Reverses Crypto Ad Ban',
          text: 'Meta will allow cryptocurrency ads on Facebook, Instagram, and WhatsApp once again.',
          source_name: 'Crypto Briefing',
          date: 'Thu, 02 Dec 2021 09:45:18 -0500',
          topics: [],
          sentiment: 'Positive',
          type: 'Article',
        },
      ]);
      console.log(error.message);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Trending News</Text>
      {newsData.map((news, index) => {
        return (
          <TouchableOpacity
            style={styles.newsItem}
            key={index}
            onPress={() =>
              navigation.navigate('ArticlePage', { articleData: news })
            }
          >
            <View>
              <Image
                source={{ uri: news.image_url }}
                style={styles.newsImage}
              />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.topics}>
                {news.topics.map((topic, index) => {
                  return (
                    <View key={index} style={styles.topicItem}>
                      <Text style={styles.topicText}>
                        {topic}
                        {news.topics.length - index !== 1 ? ',' : ''}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <Text style={styles.newsTitle}>{news.title}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CryptoNews;
