import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LMSelectModal from './LMSelectModal';
import LMSelect from './LMSelect';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-eva-icons';
import LMLoading from './LMLoading';
import LMIcon from './LMIcon';
import { NetworkAction } from '../../module/persistent/network/NetworkAction';

export default function LMNetworkSelector({ ...rest }) {
  const { activeNetwork, networks } = useSelector(
    (state) => state.NetworkReducer
  );
  useEffect(async () => {}, []);
  const dispatch = useDispatch();
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          LMSelect.show({
            data: networks,
            onPress: async (item) => {
              LMLoading.show();
              dispatch(NetworkAction.setActiveNetwork(item));
              LMLoading.hide();
            },
            key: 'name',
            label: 'displayName',
            selected: activeNetwork,
          });
        }}
      >
        {/* <LMIcon hash={activeNetwork.displayName} size={18} /> */}
        <Text numberOfLines={1} style={styles.text}>
          {activeNetwork.displayName}
        </Text>
        <Icon name="arrow-ios-downward" fill={'black'} width={25} height={25} />
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 12,
    marginRight: 10,
  },
  textInput: {
    paddingLeft: 5,
    width: '100%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#d5d5d5',
    backgroundColor: 'white',
  },
  label: { color: 'white', fontWeight: 'bold' },
  error: { color: 'red', fontWeight: 'bold' },
});
