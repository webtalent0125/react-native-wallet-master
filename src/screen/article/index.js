import React from 'react';
import { Image, Text, View, ScrollView } from 'react-native';

import ClockSvg from '../../assets/images/svg/clock.svg';
import NavigationHeader from '../../components/navigation';
import { styles } from './styles';

const ArticlePage = (props) => {
  const { articleData } = props.route.params;

  if (!articleData) {
    return (
      <View>
        <Text>404</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationHeader {...props} share />
      <View style={styles.mainContent}>
        <View style={styles.topBar}></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {articleData.topics && (
            <View style={styles.topicWrapper}>
              {articleData.topics.map((topic, index) => {
                return (
                  <View style={styles.topicItem} key={index}>
                    <Text style={styles.topicText}>
                      {topic}
                      {articleData.topics.length - index !== 1 ? ',' : ''}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          <Text style={styles.title}>{articleData.title}</Text>

          <View style={styles.publishDate}>
            <ClockSvg width={17} height={17} />
            <Text style={styles.publishDateText}>{articleData.date}</Text>
          </View>

          <Text style={styles.contentText}>{articleData.text}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default ArticlePage;
