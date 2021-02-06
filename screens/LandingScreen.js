import React from 'react';
import {StyleSheet, ScrollView, View, Button} from 'react-native';
import ScreenTitle from '../components/shared/ScreenTitle';
import AlgorithmGenreTile from '../components/landing_screen/AlgorithmGenreTile';
import SortingSvg from '../assets/images/sortingIcon.svg';
import PathFindingSvg from '../assets/images/pathFindingIcon.svg';
import {WHITE} from '../constants/colors';

const LandingScreen = (props) => {
  return (
    <View style={styles.container}>
      <ScreenTitle>CS Visual</ScreenTitle>

      <ScrollView style={styles.algorithmList}>
        <AlgorithmGenreTile
          svgComponent={<SortingSvg height="100%" width="95%" />}
          onPress={() => {
            props.navigation.navigate('SortingAlgorithmMenuScreen');
          }}
        />
        <AlgorithmGenreTile
          svgComponent={<PathFindingSvg height="100%" width="95%" />}
          onPress={() => {
            props.navigation.navigate('PathFindingAlgorithmMenuScreen');
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  algorithmList: {
    flex: 1,
    width: '90%',
  },
});

export default LandingScreen;
