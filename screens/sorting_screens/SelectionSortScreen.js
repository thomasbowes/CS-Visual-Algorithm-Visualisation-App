import React, {useState, useEffect} from 'react';
import {Pressable} from 'react-native';
import RegularSortingTemplate from '../../components/sorting/RegularSortingTemplate';
import HelpModal from '../../components/sorting/HelpModal';
import HelpSVG from '../../assets/images/help.svg';

// Step Types
const COMPARE_NUMS = 0;
const STOP_COMPARE_NUMS = 1;
const SWAP_NUMS = 2;
const MARK_SORTED = 3;
const MARK_HIDDEN_NUMS = 4;
const UNMARK_HIDDEN_NUMS = 5;
const MARK_PIVOT = 6;
const UNMARK_PIVOT = 7;
const MOVE_TO_LEFT_AND_NEW_POS = 8;
const MOVE_TO_RIGHT = 9;
const SHRINK_NUM_BARS = 10;
const EXPAND_NUM_BARS = 11;

const SelectionSortScreen = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    props.navigation.setParams({toggleModal: toggleModal});
  }, []);

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  const selectionSort = (array) => {
    let tempSortingArray = [...array];
    let sortingStepsArray = [];
    let length = tempSortingArray.length;
    let currentMinIndex = 0;
    let newCurrentMinIndex = false;
    let counterShift = 0;

    while (counterShift !== length) {
      currentMinIndex = counterShift;

      for (let i = counterShift + 1; i < length; i++) {
        // if first comparison we add both number indexs
        // otherwise we mark only new number for compare
        if (i == counterShift + 1) {
          sortingStepsArray.push({
            stepType: COMPARE_NUMS,
            numberIndexs: [i, currentMinIndex],
          });
        } else {
          sortingStepsArray.push({
            stepType: COMPARE_NUMS,
            numberIndexs: [i],
          });
        }

        // Checks if we found a new min index
        if (tempSortingArray[currentMinIndex] - tempSortingArray[i] > 0) {
          newCurrentMinIndex = true;
        }

        // Check if we are at end of array, if so stop comparing all
        // Otherwise unmark the larger number
        if (i >= length) {
          sortingStepsArray.push({
            stepType: STOP_COMPARE_NUMS,
            numberIndexs: [i, currentMinIndex],
          });
        } else {
          if (newCurrentMinIndex) {
            sortingStepsArray.push({
              stepType: STOP_COMPARE_NUMS,
              numberIndexs: [currentMinIndex],
            });
          } else {
            sortingStepsArray.push({
              stepType: STOP_COMPARE_NUMS,
              numberIndexs: [i],
            });
          }
        }

        if (newCurrentMinIndex) {
          currentMinIndex = i;
          newCurrentMinIndex = false;
        }
      }

      sortingStepsArray.push({
        stepType: MARK_SORTED,
        numberIndexs: [currentMinIndex],
      });

      sortingStepsArray.push({
        stepType: STOP_COMPARE_NUMS,
        numberIndexs: [currentMinIndex],
      });

      sortingStepsArray.push({
        stepType: SWAP_NUMS,
        numberIndexOne: counterShift,
        numberIndexTwo: currentMinIndex,
      });

      [tempSortingArray[counterShift], tempSortingArray[currentMinIndex]] = [
        tempSortingArray[currentMinIndex],
        tempSortingArray[counterShift],
      ];

      counterShift++;
    }

    return sortingStepsArray;
  };

  return (
    <>
      <RegularSortingTemplate
        sortingAlgorithm={selectionSort}
        pageTitle="Selection Sort"
      />
      <HelpModal toggleModal={toggleModal} modalOpen={modalOpen} />
    </>
  );
};

// Add help button to corner
SelectionSortScreen.navigationOptions = ({navigation}) => ({
  headerRight: () => (
    <Pressable
      onPress={() => {
        navigation.getParam('toggleModal')();
      }}
      style={({pressed}) => {
        if (pressed) {
          return {paddingRight: 10, opacity: 0.5};
        }
        return {paddingRight: 10};
      }}>
      <HelpSVG width={25} height={25} />
    </Pressable>
  ),
});

export default SelectionSortScreen;
