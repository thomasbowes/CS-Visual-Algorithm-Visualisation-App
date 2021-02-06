import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import ScreenTitle from '../components/shared/ScreenTitle';
import AlgorithmMenuListItem from '../components/algorithm_menu/AlgorithmMenuListItem';
import {WHITE} from '../constants/colors';

const SortingAlgorithmMenuScreen = (props) => {
  const ALGORITHM_LIST = [
    {
      title: 'Bubble Sort',
      subTitle: 'Best: O(n)\nAverage: O(n^2)\nWorst: O(n^2)',
      onPress: () => {
        props.navigation.navigate('BubbleSortScreen');
      },
    },
    {
      title: 'Insertion Sort',
      subTitle: 'Best: O(n)\nAverage: O(n^2)\nWorst: O(n^2)',
      onPress: () => {
        props.navigation.navigate('InsertionSortScreen');
      },
    },
    {
      title: 'Merge Sort',
      subTitle: 'Best: O(nlog(n))\nAverage: O(nlog(n))\nWorst: O(nlog(n))',
      onPress: () => {
        props.navigation.navigate('MergeSortScreen');
      },
    },
    {
      title: 'Selection Sort',
      subTitle: 'Best: O(n^2)\nAverage: O(n^2)\nWorst: O(n^2)',
      onPress: () => {
        props.navigation.navigate('SelectionSortScreen');
      },
    },
    {
      title: 'Quick Sort',
      subTitle: 'Best: O(nlog(n))\nAverage: O(nlog(n))\nWorst: O(n^2)',
      onPress: () => {
        props.navigation.navigate('QuickSortScreen');
      },
    },
  ];

  const generateListItem = () => {
    return ALGORITHM_LIST.map((item, index) => {
      return (
        <AlgorithmMenuListItem
          title={item.title}
          subTitle={item.subTitle}
          onPress={item.onPress}
          secondaryColor={index % 2}
          key={index}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScreenTitle>Sorting Algorithms</ScreenTitle>
      <ScrollView style={styles.algorithmList}>{generateListItem()}</ScrollView>
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
  algorithmList: {
    flex: 1,
    width: '90%',
  },
});

export default SortingAlgorithmMenuScreen;
