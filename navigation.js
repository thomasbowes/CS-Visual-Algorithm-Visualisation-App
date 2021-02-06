import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LandingScreen from './screens/LandingScreen';
import SortingAlgorithmMenuScreen from './screens/SortingAlgorithmMenuScreen';
import PathFindingAlgorithmMenuScreen from './screens/PathFindingAlgorithmMenuScreen';
import BubbleSortScreen from './screens/sorting_screens/BubbleSortScreen';
import InsertionSortScreen from './screens/sorting_screens/InsertionSortScreen';
import MergeSortScreen from './screens/sorting_screens/MergeSortScreen';
import QuickSortScreen from './screens/sorting_screens/QuickSortScreen';
import SelectionSortScreen from './screens/sorting_screens/SelectionSortScreen';

import {DARK_GRAY} from './constants/colors';

const defaultStackNavOptions = {
  headerStyle: {
    shadowColor: 'transparent',
  },
  headerTintColor: DARK_GRAY,
  headerTitle: '',
};

const MainNavigator = createStackNavigator(
  {
    LandingScreen: {
      screen: LandingScreen,
    },
    SortingAlgorithmMenuScreen: {
      screen: SortingAlgorithmMenuScreen,
    },
    PathFindingAlgorithmMenuScreen: {
      screen: PathFindingAlgorithmMenuScreen,
    },
    BubbleSortScreen: {
      screen: BubbleSortScreen,
    },
    MergeSortScreen: {
      screen: MergeSortScreen,
    },
    QuickSortScreen: {
      screen: QuickSortScreen,
    },
    InsertionSortScreen: {
      screen: InsertionSortScreen,
    },
    SelectionSortScreen: {
      screen: SelectionSortScreen,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

export default createAppContainer(MainNavigator);
