import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { styles } from './styles';

const Projects = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.time}>
            <Icon
              style={styles.timeIcon}
              name="clock-outline"
              fill="#8FA2B7"
              width={18}
              height={18}
            />
            <Text style={styles.timeText}>3h ago</Text>
          </View>
          <TouchableOpacity>
            <Icon
              style={styles.addIcon}
              name="clock-outline"
              fill="#8FA2B7"
              width={22}
              height={22}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.votes}>
          <View style={styles.votesItem}>
            <Text style={styles.votesNumber}>321</Text>
            <Text style={styles.votesText}>Up Votes</Text>
          </View>
          <View style={styles.votesLogo}>
            <Image
              style={styles.votesLogoImage}
              source={{
                uri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/10528.png',
              }}
              width={50}
              height={50}
            />
          </View>
          <View style={styles.votesItem}>
            <Text style={styles.votesNumber}>125</Text>
            <Text style={styles.votesText}>Down Votes</Text>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>ExzoCoin 2.0 (EXZO)</Text>
          <Text style={styles.network}>Network: BSC</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
            <Icon name="arrow-upward" width={15} height={15} fill="#3DEC8D" />
            <Text style={styles.buttonText}>Up Vote</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="arrow-downward" width={15} height={15} fill="#FC5D68" />
            <Text style={styles.buttonText}>Down Vote</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.detail}>
        <TouchableOpacity>
          <Text style={styles.detailText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Projects;
