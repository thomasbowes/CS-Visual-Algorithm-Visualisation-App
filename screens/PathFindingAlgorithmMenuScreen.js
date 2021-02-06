import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {WHITE} from '../constants/colors';

const PathFindingAlgorithmMenuScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, paddingBottom: '80%'}}>Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PathFindingAlgorithmMenuScreen;
